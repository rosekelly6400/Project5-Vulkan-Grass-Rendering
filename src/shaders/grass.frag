#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(set = 0, binding = 0) uniform CameraBufferObject {
    mat4 view;
    mat4 proj;
} camera;

// TODO: Declare fragment shader inputs
layout(location = 0) in vec3 normal;

layout(location = 0) out vec4 outColor;

void main() {
    // TODO: Compute fragment color

    // go back and fix this
    float lambertian = dot(normal.xyz, vec3(0.5, 0.5, 0.0));
    vec3 grassColor = vec3(0.1, 0.5, 0.1) + clamp(lambertian, 0.0, 1.0)*vec3(0.0, 0.4, 0.0);
    outColor = vec4(grassColor, 1);
    //outColor = vec4(normal.xyz, 0);
    //outColor = vec4(0.3, 0.8, 0.3, 1.0);
}
