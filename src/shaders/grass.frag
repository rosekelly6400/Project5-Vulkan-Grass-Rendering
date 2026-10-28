#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(set = 0, binding = 0) uniform CameraBufferObject {
    mat4 view;
    mat4 proj;
    vec4 camPos;
} camera;

// TODO: Declare fragment shader inputs
layout(location = 0) in vec3 normal;
layout(location = 1) in vec3 bladeColor;

layout(location = 0) out vec4 outColor;

void main() {
    // TODO: Compute fragment color

    float lambertian = dot(normal.xyz, vec3(0.0, -1.0, 0.0));
    vec3 grassColor = vec3(0.2, 0.55, 0.28) + clamp(lambertian, 0.0, 1.0)*vec3(0.1, 0.3, 0.2);
    outColor = vec4(grassColor, 1);


    //SKYBOX
    if (bladeColor.r > -0.5) {
        outColor = vec4(bladeColor, 1);
    }
}
