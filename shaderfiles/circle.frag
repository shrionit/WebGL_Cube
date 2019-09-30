#ifdef GL_ES
precision mediump float;
#endif

#iChannel0"https://m.media-amazon.com/images/M/MV5BMTA0ODU1OTE5NTNeQTJeQWpwZ15BbWU4MDUwMzg2NDQz._V1_SY1000_CR0,0,665,1000_AL_.jpg"

uniform vec2 u_resolution;

float circle(vec2 position, float radius){
    return step(radius, length(position));
}

void main(){
    vec2 position = 6.0 * gl_FragCoord.xy / iResolution.xy - 0.5;
    
    for(int n=1;n<9;n++){
        float i = float(n);
        position += vec2(0.7 / i * sin(i * position.y + iGlobalTime + 0.3 * i) + 0.8, 2.4 / i * sin( i * position.x + iGlobalTime + 0.3 * i) + 1.6);
    }

    vec4 color = vec4(0.0);
    float r = 0.5 * sin(position.x) + 0.5;
    float g = 0.5 * sin(position.y) + 0.5;
    float b = 0.5 * sin(position.x + position.y) + 0.5;
    color += vec4(r, g, b, 1.0);
    gl_FragColor = vec4(color);
}