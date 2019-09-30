class Entity{
    constructor(shader, tex, num){
        this.num = num;
        this.texture = new Texture(tex);
        gl.activeTexture(gl.TEXTURE0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.get());
        gl.bindTexture(gl.TEXTURE_2D, null);
        this.shader = shader;
    }
    
    bindTex(loc){
        gl.uniform1i(loc, this.num);
    }
}

class Texture{
    constructor(url){
        this.tex = loadTextures(url);
    }

    get(){
        return this.tex;
    }
}