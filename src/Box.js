class Box extends Entity{
  constructor(shader, tex, num) {
    super(shader, tex, num);
    this.gl = document.querySelector("canvas").getContext("webgl");
    this.gl.useProgram(this.shader);
    console.log();
    this.rotation = {
      x: 0.0,
      y: 0.0,
      z: 0.0
    };
    this.position = {
      x: 0.0,
      y: 0.0,
      z: 0.0
    };
    this.size = {
      x: 1.0,
      y: 1.0,
      z: 1.0
    };
    this.modelMat = null;
    this.inverse = null;
    this.inversTranspose = null;
    this.shaderObj = {};
    super.bindTex(gl.getUniformLocation(this.shader, 'uSampler'))
    this.nl = [0.0, 0.0, 0.0];
    this.nr = [0.0, 0.0, 0.0];
    this.setup();
  }

  setRotation(x, y, z) {
    this.rotation.x = x;
    this.rotation.y = y;
    this.rotation.z = z;
  }

  setPosition(x, y, z) {
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
  }

  setSize(x, y, z) {
    this.size.x = x;
    this.size.y = y;
    this.size.z = z;
  }

  getRotation() {
    return [this.rotation.x, this.rotation.y, this.rotation.z];
  }

  getPosition() {
    return [this.position.x, this.position.y, this.position.z];
  }

  getSize() {
    return [this.size.x, this.size.y, this.size.z];
  }

  i(f) {
    let aa = {
      A: 1,
      B: 0,
      C: 3,
      D: 2,
      E: 5,
      F: 4,
      G: 7,
      H: 6
    };
    let a = f.split(" ");
    return [
      parseInt(a[0]),
      parseInt(a[1]),
      parseInt(a[2]),
      parseInt(a[2]),
      parseInt(a[0]),
      parseInt(a[2]) + 1
    ];
  }

  get() {
    let A = [0.5, -0.5, 0.5];
    let B = [-0.5, -0.5, 0.5];
    let C = [-0.5, 0.5, 0.5];
    let D = [0.5, 0.5, 0.5];
    let E = [0.5, -0.5, -0.5];
    let F = [-0.5, -0.5, -0.5];
    let G = [-0.5, 0.5, -0.5];
    let H = [0.5, 0.5, -0.5];
    return {
      vertexData: [
        //back
        ...A,
        ...B,
        ...C,
        ...D,

        //front
        ...E,
        ...F,
        ...G,
        ...H,

        //left
        ...A,
        ...E,
        ...H,
        ...D,

        //right
        ...B,
        ...F,
        ...G,
        ...C,

        //top
        ...H,
        ...G,
        ...C,
        ...D,

        //bottom
        ...E,
        ...F,
        ...B,
        ...A
      ],
      indexData: [
        ...this.i("0 1 2"),
        ...this.i("4 5 6"),
        ...this.i("8 9 10"),
        ...this.i("12, 13, 14"),
        ...this.i("16, 17, 18"),
        ...this.i("20, 21, 22")
      ],
      normalData: [
        //back
        ...[0.0, 0.0, -1.0],
        ...[0.0, 0.0, -1.0],
        ...[0.0, 0.0, -1.0],
        ...[0.0, 0.0, -1.0],

        //front
        ...[0.0, 0.0, 1.0],
        ...[0.0, 0.0, 1.0],
        ...[0.0, 0.0, 1.0],
        ...[0.0, 0.0, 1.0],

        //left
        ...[-1.0, 0.0, 0.0],
        ...[-1.0, 0.0, 0.0],
        ...[-1.0, 0.0, 0.0],
        ...[-1.0, 0.0, 0.0],

        //right
        ...[1.0, 0.0, 0.0],
        ...[1.0, 0.0, 0.0],
        ...[1.0, 0.0, 0.0],
        ...[1.0, 0.0, 0.0],

        //top
        ...[0.0, -1.0, 0.0],
        ...[0.0, -1.0, 0.0],
        ...[0.0, -1.0, 0.0],
        ...[0.0, -1.0, 0.0],

        //bottom
        ...[0.0, 1.0, 0.0],
        ...[0.0, 1.0, 0.0],
        ...[0.0, 1.0, 0.0],
        ...[0.0, 1.0, 0.0]
      ]
    };
  }

  move(newLoc) {
    this.nl[0] = newLoc[0]*2;
    this.nl[1] = newLoc[1]*2;
    this.nl[2] = newLoc[2]*2;
    this.setPosition(...this.nl);
  }

  rotate(newRot) {
    this.nr[0] = newRot[0] * 20;
    this.nr[1] = newRot[1] * 20;
    this.nr[2] = newRot[2] * 20;
    this.setRotation(...this.nr);
  }

  getShader(){
    return this.shader;
  }

  setup() {
    this.modelMat = transform(
      this.getPosition(),
      this.getRotation(),
      this.getSize()
    );
    this.inverse = mat4.invert(this.modelMat, this.modelMat);
    this.inverseTranspose = mat4.transpose(this.inverse, this.inverse);
    this.shaderObj.modelMatrix = this.gl.getUniformLocation(
      this.shader,
      "model"
    );
    loadMat4ToLocation(this.shaderObj.modelMatrix, this.modelMat);
    this.shaderObj.inversTranspose = this.gl.getUniformLocation(
      this.shader,
      "modelInverseTranspose"
    );
    loadMat4ToLocation(this.shaderObj.inversTranspose, this.inverseTranspose);
    let tex = this.makeTexCord(this.get().indexData.length);
    load(this.get().vertexData, tex, this.get().normalData);
    loadToIBO(this.get().indexData);
  }

  update(){
    this.modelMat = transform(
      this.getPosition(),
      this.getRotation(),
      this.getSize()
    );
    this.inverse = mat4.invert(this.modelMat, this.modelMat);
    this.inverseTranspose = mat4.transpose(this.inverse, this.inverse);
    loadMat4ToLocation(this.shaderObj.inversTranspose, this.inverseTranspose);
    loadMat4ToLocation(
      this.shaderObj.modelMatrix,
      transform(this.getPosition(), this.getRotation(), this.getSize())
    );
  }

  makeTexCord(n) {
    let f = [];
    for (let i = 0; i < n / 4; i++) {
      let l = [0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0];
      f.push(...l);
    }
    return f;
  }

  show() {
    this.update();
    this.gl.drawElements(
      this.gl.TRIANGLES,
      this.get().indexData.length,
      this.gl.UNSIGNED_SHORT,
      0
    );
    //this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }
}