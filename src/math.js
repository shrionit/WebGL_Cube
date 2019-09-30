
function createTransformationMatrix(matrix, newpos, rotation, scale){
	let mat = matrix;
	mat4.translate(mat, mat, newpos);
	mat4.rotateX(mat, mat, rotation[0]);
	mat4.rotateY(mat, mat, rotation[1]);
	mat4.rotateZ(mat, mat, rotation[2]);
	mat4.scale(mat, mat, scale);
	return mat;
}

function createProjectionMatrix(fov, aspect, near, far){
	let mat = mat4.create();
	mat4.perspective(mat, fov, aspect, near, far);
	return mat;
}

function createViewMatrix(cameraPos, cameraRot){
	let mat = mat4.create();
	mat4.translate(mat, mat, cameraPos);
	mat4.rotateX(mat, mat, cameraRot[0]);
	mat4.rotateY(mat, mat, cameraRot[1]);
	mat4.rotateZ(mat, mat, cameraRot[2]);
	mat4.invert(mat, mat);
	return mat;
}