let vertex_shader = document.getElementById("vS").textContent;

let fragment_shader = document.getElementById("fS").textContent;
class Shader {
  constructor(gl) {
      this.gl = gl;
      this.shader = this.loadShader(vertex_shader, fragment_shader);
      this.gl.useProgram(this.shader);
      this.UniformLoc = {
        uSampler: this.gl.getUniformLocation(this.shader, "uSampler"),
        modelMat: this.gl.getUniformLocation(this.shader, "model"),
        viewMat: this.gl.getUniformLocation(this.shader, "view"),
        projectionMat: this.gl.getUniformLocation(this.shader, "projection"),
        transposeInvers: this.gl.getUniformLocation(this.shader,"modelInverseTranspose")
      };
  }

  loadMatrices(proj, camera){
      loadMat4ToLocation(this.UniformLoc.projectionMat, proj);
      loadMat4ToLocation(
        this.UniformLoc.viewMat,
        camera
      );
  }

  get(){
      return this.shader;
  }

  uniformObj(){
      return this.UniformLoc;
  }

  loadShader(vertShader, fragShader) {
    let vS = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vS, vertShader);
    gl.compileShader(vS);
    if (!vS) {
      console.log(vS);
    }
    let fS = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fS, fragShader);
    gl.compileShader(fS);
    if (!fS) {
      console.log(fS);
    }
    let shader = gl.createProgram();
    gl.attachShader(shader, vS);
    gl.attachShader(shader, fS);
    gl.linkProgram(shader);
    if (!shader) {
      console.log(shader);
    }
    return shader;
  }
}