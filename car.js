// Based on a Directional lighting and a Point Lighting demo: By Frederick Li
// Vertex shader program
var theta=0;
var phi=0;
var r=50;
var step=0.174533/3;
var eyeX=(r)*(Math.sin(theta))*(Math.cos(phi));
var eyeY=(r)*(Math.sin(theta))*(Math.sin(phi));
var eyeZ=(r)*(Math.cos(theta));
var setX=0;
var setY=300;
var setZ=300;
var x=0;
var z=0;
var wheelrot=0;
var pointX=0;
var pointY=0;
var pointZ=0;
var carRot=0;
var leftDoor=false;
var rightDoor=false;
var setView=false;
var colours =[];
var map={};
var size=200;
var directional = false;
var colors = new Float32Array([    // Colors
  1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v1-v2-v3 front
  1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v3-v4-v5 right
  1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v5-v6-v1 up
  1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v1-v6-v7-v2 left
  1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v7-v4-v3-v2 down
  1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0　    // v4-v7-v6-v5 back
]);
colours.push(colors);
var colors = new Float32Array([    // Colors
  1, 1, 0,   1, 1, 0,   1, 1, 0,  1, 1, 0,     // v0-v1-v2-v3 front
  1, 1, 0,   1, 1, 0,   1, 1, 0,  1, 1, 0,     // v0-v3-v4-v5 right
  1, 1, 0,   1, 1, 0,   1, 1, 0,  1, 1, 0,     // v0-v5-v6-v1 up
  1, 1, 0,   1, 1, 0,   1, 1, 0,  1, 1, 0,     // v1-v6-v7-v2 left
  1, 1, 0,   1, 1, 0,   1, 1, 0,  1, 1, 0,     // v7-v4-v3-v2 down
  1, 1, 0,   1, 1, 0,   1, 1, 0,  1, 1, 0　    // v4-v7-v6-v5 back
]);
colours.push(colors);
var colors = new Float32Array([    // Colors
  1, 1, 1,   1, 1, 1,   1, 1, 1,  1, 1, 1,     // v0-v1-v2-v3 front
  1, 1, 1,   1, 1, 1,   1, 1, 1,  1, 1, 1,     // v0-v3-v4-v5 right
  1, 1, 1,   1, 1, 1,   1, 1, 1,  1, 1, 1,     // v0-v5-v6-v1 up
  1, 1, 1,   1, 1, 1,   1, 1, 1,  1, 1, 1,     // v1-v6-v7-v2 left
  1, 1, 1,   1, 1, 1,   1, 1, 1,  1, 1, 1,     // v7-v4-v3-v2 down
  1, 1, 1,   1, 1, 1,   1, 1, 1,  1, 1, 1　    // v4-v7-v6-v5 back
]);
colours.push(colors);
var colors = new Float32Array([    // Colors
  0, 1, 1,   0, 1, 1,   0, 1, 1,  0, 1, 1,     // v0-v1-v2-v3 front
  0, 1, 1,   0, 1, 1,   0, 1, 1,  0, 1, 1,     // v0-v3-v4-v5 right
  0, 1, 1,   0, 1, 1,   0, 1, 1,  0, 1, 1,     // v0-v5-v6-v1 up
  0, 1, 1,   0, 1, 1,   0, 1, 1,  0, 1, 1,     // v1-v6-v7-v2 left
  0, 1, 1,   0, 1, 1,   0, 1, 1,  0, 1, 1,     // v7-v4-v3-v2 down
  0, 1, 1,   0, 1, 1,   0, 1, 1,  0, 1, 1　    // v4-v7-v6-v5 back
]);
colours.push(colors);
var colors = new Float32Array([    // Colors
  0, 0, 1,   0, 0, 1,   0, 0, 1,  0, 0, 1,     // v0-v1-v2-v3 front
  0, 0, 1,   0, 0, 1,   0, 0, 1,  0, 0, 1,     // v0-v3-v4-v5 right
  0, 0, 1,   0, 0, 1,   0, 0, 1,  0, 0, 1,     // v0-v5-v6-v1 up
  0, 0, 1,   0, 0, 1,   0, 0, 1,  0, 0, 1,     // v1-v6-v7-v2 left
  0, 0, 1,   0, 0, 1,   0, 0, 1,  0, 0, 1,     // v7-v4-v3-v2 down
  0, 0, 1,   0, 0, 1,   0, 0, 1,  0, 0, 1　    // v4-v7-v6-v5 back
]);
colours.push(colors);
var colors = new Float32Array([    // Colors
  0, 1, 0,   0, 1, 0,   0, 1, 0,  0, 1, 0,     // v0-v1-v2-v3 front
  0, 1, 0,   0, 1, 0,   0, 1, 0,  0, 1, 0,     // v0-v3-v4-v5 right
  0, 1, 0,   0, 1, 0,   0, 1, 0,  0, 1, 0,     // v0-v5-v6-v1 up
  0, 1, 0,   0, 1, 0,   0, 1, 0,  0, 1, 0,     // v1-v6-v7-v2 left
  0, 1, 0,   0, 1, 0,   0, 1, 0,  0, 1, 0,     // v7-v4-v3-v2 down
  0, 1, 0,   0, 1, 0,   0, 1, 0,  0, 1, 0　    // v4-v7-v6-v5 back
]);
colours.push(colors);
var colors = new Float32Array([    // Colors
  0, 0.5, 0.75,   0, 0.5, 0.75,   0, 0.5, 0.75,  0, 0.5, 0.75,     // v0-v1-v2-v3 front
  0, 0.5, 0.75,   0, 0.5, 0.75,   0, 0.5, 0.75,  0, 0.5, 0.75,     // v0-v3-v4-v5 right
  0, 0.5, 0.75,   0, 0.5, 0.75,   0, 0.5, 0.75,  0, 0.5, 0.75,     // v0-v5-v6-v1 up
  0, 0.5, 0.75,   0, 0.5, 0.75,   0, 0.5, 0.75,  0, 0.5, 0.75,     // v1-v6-v7-v2 left
  0, 0.5, 0.75,   0, 0.5, 0.75,   0, 0.5, 0.75,  0, 0.5, 0.75,     // v7-v4-v3-v2 down
  0, 0.5, 0.75,   0, 0.5, 0.75,   0, 0.5, 0.75,  0, 0.5, 0.75　    // v4-v7-v6-v5 back
]);
colours.push(colors);
var colors = new Float32Array([    // Colors
  0.5, 0.65, 0.5,   0.5, 0.65, 0.5,   0.5, 0.65, 0.5,  0.5, 0.65, 0.5,     // v0-v1-v2-v3 front
  0.5, 0.65, 0.5,   0.5, 0.65, 0.5,   0.5, 0.65, 0.5,  0.5, 0.65, 0.5,     // v0-v3-v4-v5 right
  0.5, 0.65, 0.5,   0.5, 0.65, 0.5,   0.5, 0.65, 0.5,  0.5, 0.65, 0.5,     // v0-v5-v6-v1 up
  0.5, 0.65, 0.5,   0.5, 0.65, 0.5,   0.5, 0.65, 0.5,  0.5, 0.65, 0.5,     // v1-v6-v7-v2 left
  0.5, 0.65, 0.5,   0.5, 0.65, 0.5,   0.5, 0.65, 0.5,  0.5, 0.65, 0.5,     // v7-v4-v3-v2 down
  0.5, 0.65, 0.5,   0.5, 0.65, 0.5,   0.5, 0.65, 0.5,  0.5, 0.65, 0.5　    // v4-v7-v6-v5 back
]);
colours.push(colors);
var colors = new Float32Array([    // Colors
  0.85, 0.65, 0.5,   0.85, 0.65, 0.5,   0.85, 0.65, 0.5,  0.85, 0.65, 0.5,     // v0-v1-v2-v3 front
  0.85, 0.65, 0.5,   0.85, 0.65, 0.5,   0.85, 0.65, 0.5,  0.85, 0.65, 0.5,     // v0-v3-v4-v5 right
  0.85, 0.65, 0.5,   0.85, 0.65, 0.5,   0.85, 0.65, 0.5,  0.85, 0.65, 0.5,     // v0-v5-v6-v1 up
  0.85, 0.65, 0.5,   0.85, 0.65, 0.5,   0.85, 0.65, 0.5,  0.85, 0.65, 0.5,     // v1-v6-v7-v2 left
  0.85, 0.65, 0.5,   0.85, 0.65, 0.5,   0.85, 0.65, 0.5,  0.85, 0.65, 0.5,     // v7-v4-v3-v2 down
  0.85, 0.65, 0.5,   0.85, 0.65, 0.5,   0.85, 0.65, 0.5,  0.85, 0.65, 0.5　    // v4-v7-v6-v5 back
]);
colours.push(colors);

var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'attribute vec4 a_Normal;\n' +        // Normal
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' +
  'uniform mat4 u_ViewMatrix;\n' +
  'uniform mat4 u_ProjMatrix;\n' +
  'uniform vec3 u_LightColor;\n' +     // Light color
  'uniform vec3 u_LightDirection;\n' + // Light direction (in the world coordinate, normalized)
  'varying vec4 v_Color;\n' +
  'uniform bool u_isLighting;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'void main() {\n' +
  '  gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n' +
  '  if(u_isLighting)\n' +
  '  {\n' +
  '     vec3 normal = normalize((u_NormalMatrix * a_Normal).xyz);\n' +
  '     float nDotL = max(dot(normal, u_LightDirection), 0.0);\n' +
        // Calculate the color due to diffuse reflection
  '     vec3 diffuse = u_LightColor * a_Color.rgb * nDotL;\n' +
  '     v_Color = vec4(diffuse, a_Color.a);\n' +  '  }\n' +
  '  else\n' +
  '  {\n' +
  '  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
  '  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  '     v_Color = a_Color;\n' +
  '  }\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform vec3 u_AmbientLight;\n' +
  'varying vec3 v_Normal;\n' +
  'uniform vec3 u_LightColorSpot;\n' +
  'varying vec4 v_Color;\n' +
  'uniform bool u_isLighting;\n' +
  'varying vec3 v_Position;\n' +
  'uniform vec3 u_LightPosition;\n' +
  'void main() {\n' +
  '  if(u_isLighting)\n' +
  '  {\n' +
  '  gl_FragColor = v_Color;\n' +
  '  }else\n' +
  '  {\n' +
  '  vec3 normal = normalize(v_Normal);\n' +
  '  vec3 lightDirection = normalize(u_LightPosition - v_Position);\n' +
  '  float nDotL = max(dot(lightDirection, normal), 0.0);\n' +
  '  vec3 diffuse = u_LightColorSpot * v_Color.rgb * nDotL;\n' +
  '     vec3 ambient = u_AmbientLight * v_Color.rgb;\n' +
  '  gl_FragColor = vec4(ambient+diffuse, v_Color.a);\n' +
  '  }\n' +
  '}\n';

var modelMatrix = new Matrix4(); // The model matrix
var viewMatrix = new Matrix4();  // The view matrix
var projMatrix = new Matrix4();  // The projection matrix
var g_normalMatrix = new Matrix4();  // Coordinate transformation matrix for normals

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Set clear color and enable hidden surface removal
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Clear color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Get the storage locations of uniform attributes
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  var u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
  var u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
  var u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
  var u_LightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection');
  var u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight');

  var u_LightColorSpot = gl.getUniformLocation(gl.program, 'u_LightColorSpot');
  var u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
  // Trigger using lighting or not
  var u_isLighting = gl.getUniformLocation(gl.program, 'u_isLighting');

  if (!u_ModelMatrix || !u_ViewMatrix || !u_NormalMatrix ||
      !u_ProjMatrix || !u_LightColor || !u_LightDirection ||
      !u_isLighting || !u_LightPosition || !u_AmbientLight|| !u_LightColorSpot) {
    console.log('Failed to Get the storage locations of u_ModelMatrix, u_ViewMatrix, and/or u_ProjMatrix');
    return;
  }

  // Set the light color (white)
  gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
  gl.uniform3f(u_LightColorSpot, 1.0, 1.0, 1.0);
  gl.uniform3f(u_AmbientLight, 0.3, 0.3, 0.3);
  gl.uniform3f(u_LightPosition, 5, 20, 5);
  // Set the light direction (in the world coordinate)
  var lightDirection = new Vector3([0.5, 3.0, 4.0]);
  lightDirection.normalize();     // Normalize
  gl.uniform3fv(u_LightDirection, lightDirection.elements);

  // Calculate the view matrix and the projection matrix
  viewMatrix.setLookAt(eyeX, eyeY, eyeZ, pointX, pointY, pointZ, 0, 1, 0);
  projMatrix.setPerspective(30, canvas.width/canvas.height, 1, 1200);
  // Pass the model, view, and projection matrix to the uniform variable respectively
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
  gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);



  document.onkeydown = function(ev){
    key(ev, gl, u_ModelMatrix, u_NormalMatrix, u_isLighting,u_ViewMatrix);
  };
  document.onkeyup = function(ev){
    key(ev, gl, u_ModelMatrix, u_NormalMatrix, u_isLighting,u_ViewMatrix);
  };
  setInterval(function(){
    if (map.up){
      if (!setView){
        theta=theta+step;
        eyeX=(r)*(Math.sin(theta))*(Math.cos(phi));
        eyeY=(r)*(Math.sin(theta))*(Math.sin(phi));
        eyeZ=(r)*(Math.cos(theta));
      }
      else{
        setZ=setZ+3;
      }
    }
    if (map.down){
      if (!setView){
        theta=theta-step;
        eyeX=(r)*(Math.sin(theta))*(Math.cos(phi));
        eyeY=(r)*(Math.sin(theta))*(Math.sin(phi));
        eyeZ=(r)*(Math.cos(theta));
      }
      else{
        setZ=setZ-3;
      }
    }
    if (map.left){
      if (!setView){
        phi=phi-step;
        eyeX=(r)*(Math.sin(theta))*(Math.cos(phi));
        eyeY=(r)*(Math.sin(theta))*(Math.sin(phi));
        eyeZ=(r)*(Math.cos(theta));
      }
      else{
        setX=setX-3;
      }if (!setView){
        phi=phi-step;
        eyeX=(r)*(Math.sin(theta))*(Math.cos(phi));
        eyeY=(r)*(Math.sin(theta))*(Math.sin(phi));
        eyeZ=(r)*(Math.cos(theta));
        viewMatrix.setLookAt(eyeX+x, eyeY, eyeZ+z, x, pointY, z, 0, 1, 0);
        // Pass the model, view, and projection matrix to the uniform variable respectively
        gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
        draw(gl, u_ModelMatrix, u_NormalMatrix, u_isLighting);
      }
      else{
        setX=setX-3;
        viewMatrix.setLookAt(setX, setY, setZ, pointX, pointY, pointZ, 0, 1, 0);
        gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
        draw(gl, u_ModelMatrix, u_NormalMatrix, u_isLighting);
      }
    }
    if (map.right){
      if (!setView){
        phi=phi+step;
        eyeX=(r)*(Math.sin(theta))*(Math.cos(phi));
        eyeY=(r)*(Math.sin(theta))*(Math.sin(phi));
        eyeZ=(r)*(Math.cos(theta));
      }
      else{
        setX=setX+3;
      }
    }
    if (map.w){
      x=x+3*Math.cos(-carRot * (Math.PI / 180));
      z=z+3*Math.sin(-carRot * (Math.PI / 180));
      wheelrot=wheelrot-20;
    }
    if (map.a){
      carRot=carRot+10;
    }
    if (map.s){
      x=x-3*Math.cos(-carRot * (Math.PI / 180));
      z=z-3*Math.sin(-carRot * (Math.PI / 180));
      wheelrot=wheelrot+20;
    }
    if (map.d){
      carRot=carRot-10;
    }
    if (map.g){
      if (leftDoor){
        leftDoor=false;
      }
      else {
        leftDoor=true;
      }
    }
    if (map.h){
      if (rightDoor){
        rightDoor=false;
      }
      else {
        rightDoor=true;
      }
    }
    if (x<-size/2){
      x=-size/2;
    }
    if (x>size/2){
      x=size/2;
    }
    if (z>size/2){
      z=size/2;
    }
    if (z<-size/2){
      z=-size/2;
    }
    if (!setView){
      viewMatrix.setLookAt(x+eyeX, eyeY, eyeZ+z, x, pointY, z, 0, 1, 0);
      // Pass the model, view, and projection matrix to the uniform variable respectively
      gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
      draw(gl, u_ModelMatrix, u_NormalMatrix, u_isLighting);
    }
    else{
      viewMatrix.setLookAt(setX, setY, setZ, pointX, pointY, pointZ, 0, 1, 0);
      gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
      draw(gl, u_ModelMatrix, u_NormalMatrix, u_isLighting);
    }
    draw(gl, u_ModelMatrix, u_NormalMatrix, u_isLighting,canvas,u_ViewMatrix,u_ProjMatrix);
}, 30);
}
function key(ev, gl, u_ModelMatrix, u_NormalMatrix, u_isLighting,u_ViewMatrix) {
  switch (ev.keyCode) {
    case 38: // Up arrow key -> the positive rotation of arm1 around the y-axis
      map.up= (ev.type == 'keydown');
      break;

    case 40: // Down arrow key -> the negative rotation of arm1 around the y-axis

      map.down= (ev.type == 'keydown');

      break;
    case 39: // Right arrow key -> the positive rotation of arm1 around the y-axis

      map.right= (ev.type == 'keydown');
      break;
    case 37: // Left arrow key -> the negative rotation of arm1 around the y-axis

      map.left= (ev.type == 'keydown');
      break;
    case 87: //w
      map.w= (ev.type == 'keydown');
      break;
    case 65: //a
      map.a= (ev.type == 'keydown');
      break;
    case 83: //s
      map.s= (ev.type == 'keydown');
      break;
    case 68: //d
      map.d= (ev.type == 'keydown');
      break;
    case 71: //g
        map.g= (ev.type == 'keydown');
        break;
    case 72: //h
        map.h= (ev.type == 'keydown');
        break;
    case 13: //enter
        if (ev.type == 'keydown'){
          if (setView){
            setView=false;
          }
          else{
            setView=true;
          }
        }
        break;
    case 16: //left shift
        if (ev.type == 'keydown'){
          if (directional){
            directional=false;
          }
          else {
            directional=true;
          }
        }
        break;
    default: return; // Skip drawing at no effective action
  }


  // Draw the scene
  draw(gl, u_ModelMatrix, u_NormalMatrix, u_isLighting);
}


function initVertexBuffers(gl) {
  // Create a cube
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3
  var vertices = new Float32Array([   // Coordinates
     0.5, 0.5, 0.5,  -0.5, 0.5, 0.5,  -0.5,-0.5, 0.5,   0.5,-0.5, 0.5, // v0-v1-v2-v3 front
     0.5, 0.5, 0.5,   0.5,-0.5, 0.5,   0.5,-0.5,-0.5,   0.5, 0.5,-0.5, // v0-v3-v4-v5 right
     0.5, 0.5, 0.5,   0.5, 0.5,-0.5,  -0.5, 0.5,-0.5,  -0.5, 0.5, 0.5, // v0-v5-v6-v1 up
    -0.5, 0.5, 0.5,  -0.5, 0.5,-0.5,  -0.5,-0.5,-0.5,  -0.5,-0.5, 0.5, // v1-v6-v7-v2 left
    -0.5,-0.5,-0.5,   0.5,-0.5,-0.5,   0.5,-0.5, 0.5,  -0.5,-0.5, 0.5, // v7-v4-v3-v2 down
     0.5,-0.5,-0.5,  -0.5,-0.5,-0.5,  -0.5, 0.5,-0.5,   0.5, 0.5,-0.5  // v4-v7-v6-v5 back
  ]);


  var colors = colours[5];


  var normals = new Float32Array([    // Normal
    0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
    1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
    0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
   -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
    0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 down
    0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // v4-v7-v6-v5 back
  ]);


  // Indices of the vertices
  var indices = new Uint8Array([
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
 ]);


  // Write the vertex property to buffers (coordinates, colors and normals)
  if (!initArrayBuffer(gl, 'a_Position', vertices, 3, gl.FLOAT)) return -1;
  if (!initArrayBuffer(gl, 'a_Color', colors, 3, gl.FLOAT)) return -1;
  if (!initArrayBuffer(gl, 'a_Normal', normals, 3, gl.FLOAT)) return -1;

  // Write the indices to the buffer object
  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer (gl, attribute, data, num, type) {
  // Create a buffer object
  var buffer = gl.createBuffer();
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  // Assign the buffer object to the attribute variable
  var a_attribute = gl.getAttribLocation(gl.program, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // Enable the assignment of the buffer object to the attribute variable
  gl.enableVertexAttribArray(a_attribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return true;
}

function initAxesVertexBuffers(gl) {

  var verticesColors = new Float32Array([
    // Vertex coordinates and color (for axes)
    -20.0,  0.0,   0.0,  1.0,  1.0,  1.0,  // (x,y,z), (r,g,b)
     20.0,  0.0,   0.0,  1.0,  1.0,  1.0,
     0.0,  20.0,   0.0,  1.0,  1.0,  1.0,
     0.0, -20.0,   0.0,  1.0,  1.0,  1.0,
     0.0,   0.0, -20.0,  1.0,  1.0,  1.0,
     0.0,   0.0,  20.0,  1.0,  1.0,  1.0
  ]);
  var n = 6;

  // Create a buffer object
  var vertexColorBuffer = gl.createBuffer();
  if (!vertexColorBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  var FSIZE = verticesColors.BYTES_PER_ELEMENT;
  //Get the storage location of a_Position, assign and enable buffer
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
  gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object

  // Get the storage location of a_Position, assign buffer and enable
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return -1;
  }
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
  gl.enableVertexAttribArray(a_Color);  // Enable the assignment of the buffer object

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return n;
}

var g_matrixStack = []; // Array for storing a matrix
function pushMatrix(m) { // Store the specified matrix to the array
  var m2 = new Matrix4(m);
  g_matrixStack.push(m2);
}

function popMatrix() { // Retrieve the matrix from the array
  return g_matrixStack.pop();
}

function draw(gl, u_ModelMatrix, u_NormalMatrix, u_isLighting) {

  // Clear color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.uniform1i(u_isLighting, false); // Will not apply lighting

  // Set the vertex coordinates and color (for the x, y axes)

  var n = initAxesVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Calculate the view matrix and the projection matrix
  modelMatrix.setTranslate(0, 0, 0);  // No Translation
  // Pass the model matrix to the uniform variable
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

  // Draw x and y axes
  gl.drawArrays(gl.LINES, 0, n);

  gl.uniform1i(u_isLighting, directional); // Will apply lighting

  // Set the vertex coordinates and color (for the cube)
  n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }
  //model floor
  pushMatrix(modelMatrix);
  modelMatrix.translate(0, -1.5, 0);
    modelMatrix.scale(size, 1, size); // Scale
    drawbox(gl, u_ModelMatrix, u_NormalMatrix, n);
  modelMatrix = popMatrix();

  var colors = colours[1];
  if (!initArrayBuffer(gl, 'a_Color', colors, 3, gl.FLOAT)) return -1;
  // Rotate, and then translate
  modelMatrix.translate(x, 0, z);  // Translation (No translation is supported here)
  modelMatrix.rotate(carRot, 0, 1, 0); // Rotate along y axis
  // modelMatrix.rotate(g_xAngle, 0, 1, 0); // Rotate along x axis

  // Model the car body
  pushMatrix(modelMatrix);
    modelMatrix.scale(6, 1, 4); // Scale
    drawbox(gl, u_ModelMatrix, u_NormalMatrix, n);
  modelMatrix = popMatrix();

  // Model the car top
  colors = colours[2];
  if (!initArrayBuffer(gl, 'a_Color', colors, 3, gl.FLOAT)) return -1;
  pushMatrix(modelMatrix);
    modelMatrix.translate(0, 0.95, 0);  // Translation
    modelMatrix.scale(4.5, 1.2, 3); // Scale
    drawbox(gl, u_ModelMatrix, u_NormalMatrix, n);
  modelMatrix = popMatrix();
  //modle car wheel fr
  colors = colours[3];
  if (!initArrayBuffer(gl, 'a_Color', colors, 3, gl.FLOAT)) return -1;
  pushMatrix(modelMatrix);
    modelMatrix.translate(2, -0.5, 2);
    modelMatrix.rotate(wheelrot, 0,0,1);
    modelMatrix.scale(1, 1, 0.2); // Scale
    drawbox(gl, u_ModelMatrix, u_NormalMatrix, n);
  modelMatrix = popMatrix();
  //modle car wheel br
  colors = colours[4];
  if (!initArrayBuffer(gl, 'a_Color', colors, 3, gl.FLOAT)) return -1;
  pushMatrix(modelMatrix);
    // modelMatrix.setRotate(0);
    modelMatrix.translate(-2, -0.5, 2);
    modelMatrix.rotate(wheelrot, 0,0,1);
    modelMatrix.scale(1, 1, 0.2); // Scale
    drawbox(gl, u_ModelMatrix, u_NormalMatrix, n);
  modelMatrix = popMatrix();
  //model car wheel bl
  colors = colours[0];
  if (!initArrayBuffer(gl, 'a_Color', colors, 3, gl.FLOAT)) return -1;
  pushMatrix(modelMatrix);
    modelMatrix.translate(-2, -0.5, -2);
    modelMatrix.rotate(wheelrot, 0,0,1);
    modelMatrix.scale(1, 1, 0.2); // Scale
    drawbox(gl, u_ModelMatrix, u_NormalMatrix, n);
  modelMatrix = popMatrix();
  //modle car wheel fl
  colors = colours[6];
  if (!initArrayBuffer(gl, 'a_Color', colors, 3, gl.FLOAT)) return -1;
  pushMatrix(modelMatrix);
    modelMatrix.translate(2, -0.5, -2);
    modelMatrix.rotate(wheelrot, 0,0,1);
    modelMatrix.scale(1, 1, 0.2); // Scale
    drawbox(gl, u_ModelMatrix, u_NormalMatrix, n);
  modelMatrix = popMatrix();
  // model car door right
  colors = colours[7];
  if (!initArrayBuffer(gl, 'a_Color', colors, 3, gl.FLOAT)) return -1;
  pushMatrix(modelMatrix);
    modelMatrix.translate(0, 0, 2);
    if (rightDoor){
      modelMatrix.translate(0, 0, 0.4);
      modelMatrix.rotate(70,0,1,0);
    }
    modelMatrix.scale(1, 1, 0.2); // Scale
    drawbox(gl, u_ModelMatrix, u_NormalMatrix, n);
  modelMatrix = popMatrix();
  //model car door left
  colors = colours[8];
  if (!initArrayBuffer(gl, 'a_Color', colors, 3, gl.FLOAT)) return -1;
  pushMatrix(modelMatrix);
    modelMatrix.translate(0, 0, -2);
    if (leftDoor){
      modelMatrix.translate(0, 0, -0.4);
      modelMatrix.rotate(-70,0,1,0);
    }
    modelMatrix.scale(1, 1, 0.2); // Scale
    drawbox(gl, u_ModelMatrix, u_NormalMatrix, n);
  modelMatrix = popMatrix();

}

function drawbox(gl, u_ModelMatrix, u_NormalMatrix, n) {
  pushMatrix(modelMatrix);

    // Pass the model matrix to the uniform variable
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    // Calculate the normal transformation matrix and pass it to u_NormalMatrix
    g_normalMatrix.setInverseOf(modelMatrix);
    g_normalMatrix.transpose();
    gl.uniformMatrix4fv(u_NormalMatrix, false, g_normalMatrix.elements);

    // Draw the cube
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);

  modelMatrix = popMatrix();
}
