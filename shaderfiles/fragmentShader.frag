#iChannel0 "https://m.media-amazon.com/images/M/MV5BMTA0ODU1OTE5NTNeQTJeQWpwZ15BbWU4MDUwMzg2NDQz._V1_SY1000_CR0,0,665,1000_AL_.jpg"

float c(float loc){
    loc *= 1000.0;
    return 1.0/loc;
}

void main(){
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    // Zooms out by a factor of 2.0
    uv.y *= 20.0;
    // Shifts every axis by -1.0
    uv.x -= 10.0;

    // Base color for the effect
    vec3 finalColor = vec3 ( sin(iTime), sin(iTime + 90.0), 1. );

    finalColor *= abs(1.5 / (sin( uv.x + sin(uv.y+iTime)* 0.3 ) * 20.0) );

    gl_FragColor = vec4( finalColor, 1.0 );    
    
}