Vulkan Grass Rendering
==================================

**University of Pennsylvania, CIS 565: GPU Programming and Architecture, Project 5**

* Rose Kelly
  * [LinkedIn](www.linkedin.com/in/rose-kelly-b480b01a8)
* Tested on: Windows 11, i7-13700F @ 2.10 GHz 16GB, RTX 4060-Ti 8GB (PC)

## Summary

This project uses Vulkan to implement the techniques described in the paper, [Responsive Real-Time Grass Rendering for General 3D Scenes](https://www.cg.tuwien.ac.at/research/publications/2017/JAHRMANN-2017-RRTG/JAHRMANN-2017-RRTG-draft.pdf) to generate a field of grass and simulate movement on each blade of grass by calculating and applying wind, gravity, and recovery forces, as well as performance enhancing culling and LOD.

### Features Implemented

#### Grass Rendering

I rendered the grass by running a separate graphics pipeline that takes 3 Bezier control points for each blade of grass, and uses those control points in a tessellation shader to generate additional vertices to form the curved shape of each grass blade. 

<img src="img/readme/noForces.png" width="600" >

#### Forces Simulation

Forces are calculated in a compute shader that runs before the graphics pipeline that processes the grass blades. The overall force is calculated from the individual wind, gravity and recovery forces and then applied to the second and third control points for the grass blade to change its shape and show the natural effect of the forces on the blade of grass.

- Gravity

- Recovery

<img src="img/readme/gravityAndRecovery.png" width="600" >

- Wind

<img src="img/readme/basicWind.gif" width="600" >

#### Culling

Culling also occurs in the compute shader that runs before the grass graphics pipeline to identify blades that can be culled without significantly impacting the quality of the grass field render.

- Orientation Culling: I test if a grass blade is close to perpendicular (the camera sees only the thin edge of the grass blade) with the camera view vector by checking if the dot product of the blade's front vector and the view vector is within a set range. If the grass blade is close enough to being perpendicular, it gets culled and is not rendered.


- Distance Culling: the blades of grass are split into buckets based on how far they are from the camera. Buckets further from the camera have more blades of grass culled since they reducing the number of blades for locations far from the viewer has a lower impact on the overall image since farther away objects show less detail and occupy a smaller total area on screen.

<img src="img/readme/distanceCulling.gif" width="600" >

- View-frustum Culling: any blades that are entirely outside of the view frustum are culled since performing calculations for them would be a waste of resources as they don't show up on screen.

<img src="img/readme/frustumCulling.gif" width="600" >

## Performance Analysis