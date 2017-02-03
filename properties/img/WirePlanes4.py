"""WirePlanes4.py -- use conformal mapping to solve for electrostatic
potential in case of three wire planes between two plates, using the
conformal representation technique of Buneman, et al., Can.J.Res.27A
pp. 191-206 (1949). The solution is guaranteed to obey Laplace's
equation by the properties of analytic functions; correctness of the
boundary conditions is checked by verifying potentials on the surfaces
of the wires and plates.

All arguments z = x + iy are coordinates in (x,y) plane, may be numpy arrays.
All functiosn W = U + iV are complex potential, V = electrostatic potential.

:authors: Glenn Horton-Smith, 2015-08-14
"""

import numpy as np
import matplotlib.pyplot as plt

pi = np.pi

def logsinh(z):
    """Protect against overflows in log(sinh(z)).
    The argument z can (should) be a numpy array."""
    z = np.array(z+0.0j, ndmin=1)
    mask = (np.abs(z.real) <= 20.0)
    W = np.zeros_like(z)
    W[mask] = np.log(np.sinh(z[mask]))
    if not mask.all():
        mask = z.real > 20.0
        W[mask] = z[mask]-np.log(2.0)
        mask = z.real < -20.0
        W[mask] = -z[mask]+pi*1j-np.log(2.0)
        W = W.real + 1.j*(np.mod(W.imag+pi,2.0*pi)-pi)
    return W


def W_L(z, dE, d, r):
    """Wire plane potential due to net charge on wires
    for single plane at x=0 and zero potential on the wires.
    z = x+iy = coordinate
    dE = difference in asymptotic field in x direction on two sides of plane,
         dE = E_right - E_left
    d = wire pitch, spacing center to center of wires in this plane
    r = radius of wire
    """
    W = 1j*(dE/(2*pi))*d*(logsinh(pi*z/d)-np.log(pi*r/d))
    return W
    

def W_D(z, Emean, d, r):
    """Potential due to induced dipole on wires
    for single plane at x=0 and zero potential on the wires.
    z = x+iy = coordinate
    Emean = average of asymptotic horizontal field on two sides of plane
    d = wire pitch, spacing center to center of wires in this plane
    r = radius of wire
    """
    return -1j*Emean*r**2*(pi/d)*np.tanh(pi*z/d)**-1

def W_E(z, Emean):
    """Potential due to constant mean field
    z = x+iy = coordinate
    Emean = average asymptotic horizontal field
    """
    return 1j*Emean*z

def W_3(z, E0, E1, E2, E3, E4, d, r, s):
    """Combined potential for three wire planes, where
    first wire plane is at x=-s, second at x=0, third at x=+s.
    z = x+iy = coordinate
    E0 = asymptotic field in region x < -s.
    E1 = asymptotic field between first and second wire planes.
    E2 = asymptotic field between second and third wire planes.
    E3 = asymptotic field between third and fourth wire planes.
    E4 = asymptotic field in region x > +s.
    d = wire pitch, spacing center to center of wires in this plane
    r = radius of wire
    s = wire plane spacing, center to center

    Note that the field between the planes will only approach the
    asymptotic values E1 and E2 in the case of s >> d.  The potential
    returned by this function will be a solution of Laplace equation with
    equipotential surfaces in the correct place regardless.  The E parameters
    can be adjusted as needed to obtain particular wire voltages, or they can
    be adjusted to obtain transparency and voltages found.
    """
    # first calculate the dE and Emeans
    # we're going to superpose fields that are Em+dE/2 on right, Em-dE/2 on left
    #  E0 = Em + 0.5*(-dE1-dE2-dE3)
    #  E1 = Em + 0.5*(+dE1-dE2-dE3)
    #  E2 = Em + 0.5*(+dE1+dE2-dE3)
    #  E3 = Em + 0.5*(+dE1+dE2+dE3)
    #
    #  solution is
    #    Em = (E0+E3)/2
    #    dE1 = E1-E0
    #    dE2 = E2-E1
    #    dE3 = E3-E2
    #
    W1 = W_L(z+s, E1-E0, d, r) + W_D(z+s, 0.5*(E1+E0), d, r)
    W2 = W_L(z,   E2-E1, d, r) + W_D(z,   0.5*(E2+E1), d, r)
    W3 = W_L(z-s, E3-E2, d, r) + W_D(z-s, 0.5*(E3+E2), d, r)
    W4 = W_L(z-2*s, E4-E3, d, r) + W_D(z-2*s, 0.5*(E4+E3), d, r)
    W = W1 + W2 + W3 + W4 + W_E(z, 0.5*(E0+E4))
    return W

def find_surface_potentials(E0, E1, E2, E3, E4, d, r, s, x0, x4):
    """Checks the surface potentials at the wires and the plates.
    Finds values and also checks uniformity.
    E0, E1, E2, E3, d, r, s have the same meaning as in W_3.
    x0 and x4 are locations far from wires, e.g., a cathode and anode.
    Returns a tuple of two 5-element lists.
    The first element of the tuple contains the voltages [V0, V1, V2, V3, V4],
    where V1,2,3 are the wire voltages and V0,V4 are potential at x0, x4.
    The second element contains the minimum and maximum values found along
    the surfaces.
    """
    V = [0.0]*6
    dV = [0.0]*6
    #-- check planes at two key points
    for i,x in ( (0,x0), (5,x4) ):
        ztest = np.array([x+0j, x+d*0.5j])
        Varr = W_3(ztest, E0, E1, E2, E3, E4, d, r, s).imag
        V[i] = np.average(Varr)
        dV[i] = Varr.max()-Varr.min()
    #-- check planes at four key points
    for i in [1,2,3,4]:
        x = (i-2)*s
        ztest = np.array([x+r+0j, x+r*1j, x-r+0j, x-r*1j])
        Varr = W_3(ztest, E0, E1, E2, E3, E4, d, r, s).imag
        V[i] = np.average(Varr)
        dV[i] = Varr.max()-Varr.min()
    return np.array(V), np.array(dV)
    

def plotW_3(rangex, rangey, nsamp, E0, E1, E2, E3, E4, d, r, s):
    """Plot potentials in a range of x and y"""
    #-- make z using numpy.mgrid
    xy = np.mgrid[rangex[0]:rangex[1]:(nsamp*1j),
                  rangey[0]:rangey[1]:(nsamp*1j)]
    z = xy[0]+1j*xy[1]
    W = W_3(z, E0, E1, E2, E3, E4, d, r, s)
    V = W.imag
    Vsurf, dV = find_surface_potentials(E0, E1, E2, E3, E4, d, r, s,
                                         rangex[0], rangex[1])
    V -= Vsurf[2]
    Vsurf -= Vsurf[2]
    print Vsurf,dV
    nwire = 0
    iwire = 0
    for i in range(1,5):
        if rangex[0] < s*(i-2)+r and rangex[1] > s*(i-2)-r:
            iwire = i
            nwire += 1
    if nwire == 0:
        print "no wires in field"
        Vmin = np.min(V)
        Vmax = np.max(V)
        Vlevels = np.linspace(Vmin, Vmax, 20)
    elif nwire > 1:
        print nwire, "wires in field"
        Vmin = np.min(Vsurf-dV)
        Vmax = np.max(Vsurf+dV)
        Vlevels = np.linspace(Vmin, Vmax, 20)
    else:
        print "1 wire in field"
        Vsliced = V[ np.abs(xy[0]-s*(iwire-2)) > r]
        Vmin = Vsliced.min()
        Vmax = Vsliced.max()
        Vstep = (Vmax-Vmin)/10
        V0 = Vsurf[iwire]
        print Vmin,V0,Vmax
        Vlevels = V0 + np.arange( int((Vmin-V0)/Vstep-1.5),
                                  int((Vmax-V0)/Vstep+2.5) )*Vstep
    print Vlevels
    contour = plt.contour(xy[0], xy[1], V, Vlevels)
    colorbar = plt.colorbar(contour, spacing='proportional',
                            format='%.1f')
    plt.grid()
    if nwire == 1:
        phi = np.linspace(-pi, pi, 60)
        y0 = d*np.round(0.5*(rangey[0]+rangey[1])/s)
        x0 = s*(iwire-2)
        plt.fill(x0+r*np.cos(phi), y0+r*np.sin(phi),
                 fill=False, hatch='/', zorder=-100)
    return (contour, colorbar)


def plot_4pane(E0, E1, E2, E3, E4, d, r, s, x0, x4):
    """Plot a 4-pane view of potentials around wires and an overview of
    all three wire planes.
    """
    V, dV = find_surface_potentials(E0, E1, E2, E3, E4, d, r, s,
                                        x0, x4)
    V -= V[3]
    fig = plt.figure(figsize=[9.0,6.5])
    fig.text(0.5, 0.95,
             "E0=%g, E1=%g, E2=%g, E3=%g, E4=%d" % (E0,E1,E2,E3,E4),
             ha='center', va='bottom')
    fig.text(0.5, 0.95,
             "V(%g)=%g, V1=%g, V2=%g, V3=%g, V4=%g, V(%g)=%g" % (
                 x0, V[0], V[1], V[2], V[3], V[4], x4, V[5]),
             ha='center', va='top')
    fig.add_subplot(2,2,1, aspect=1)
    plotW_3([-s-2.75*r,-s+1.25*r], [-2*r,2*r], 400, E0, E1, E2, E3, E4, d, r, s)
    fig.add_subplot(2,2,2, aspect=1)
    plotW_3([-2.75*r,+1.25*r], [-2*r,2*r], 400, E0, E1, E2, E3, E4, d, r, s)
    fig.add_subplot(2,2,3, aspect=1)
    plotW_3([+s-2*r,+s+2*r], [-2*r,2*r], 400, E0, E1, E2, E3, E4, d, r, s)
    fig.add_subplot(2,2,4, aspect=1)
    plotW_3([+s*2-2*r,+s*2+2*r], [-2*r,2*r], 400, E0, E1, E2, E3, E4, d, r, s)
    return fig


def plot_many():
    """Plot potentials for four example cases"""
    figs = []
    
    rat = 1.225
    fig_rat_1p5 = plot_4pane(500.0, 1.21*500, rat**2*500, rat**3*500, -rat**3*500.0*1.06, 0.479, 75e-4, 0.5, -25.6, 1.5)
    fig_rat_1p5.show()
    fig_rat_1p5.savefig('rat_1p5.pdf')
    fig_rat_1p5.savefig('rat_1p5.png')
    figs.append(fig_rat_1p5)

    

    return figs

if __name__ == "__main__":
    plot_many()
