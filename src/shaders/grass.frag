#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(set = 0, binding = 0) uniform CameraBufferObject {
    mat4 view;
    mat4 proj;
    vec4 camPos;
} camera;

// TODO: Declare fragment shader inputs
layout(location = 0) in vec3 normal;

layout(location = 0) out vec4 outColor;

void main() {
    // TODO: Compute fragment color

    float camToCenterDist = length(camera.camPos.xyz)/ 20.0;

    // go back and fix this
    float lambertian = dot(normal.xyz, vec3(0.0, -1.0, 0.0));
    vec3 grassColor = vec3(0.1, 0.5, 0.1) + clamp(lambertian, 0.0, 1.0)*vec3(0.0, 0.4, 0.0);
    vec3 lambertianGrassColor = clamp(lambertian, 0.0, 1.0)*vec3(0.4, 0.8, 0.4);
    outColor = vec4(grassColor, 1);
    //outColor = vec4(normal.xyz, 0);
    //outColor = vec4(0.3, 0.8, 0.3, 1.0);

    //outColor = vec4(camToCenterDist, camToCenterDist, camToCenterDist, 1);

    // Camera position debugging view
    //outColor = vec4(normalize(camera.camPos.xyz), 1);
}
