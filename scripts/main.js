var compound_transform;

// automatically called whenever any transform changes
function CalculateCompoundTransform(transforms) {
    // matrices in `transforms[i].mat4x4`
    // note `transform[0]` is first tranform to apply to vertex
    
    // if only one transform, set compound transform equal to it
    // otherwise multiply all matrices together (in proper order)
    // `compound_transform = Matrix.multiply(...)`
    var transform_matrices = [];
    
    for(let i = 0; i < transforms.length; i++) {
        transform_matrices.push(transforms[i].mat4x4); 
    }

    compound_transform = new Matrix(4, 4); // change / remove this
    
    if(transforms.length > 1) compound_transform = Matrix.multiply(transform_matrices); 
    else return transform_matrices[0]; 

    return compound_transform;
}

// automatically called whenever compound transform changes
function CalculateTransformedVertex(vertex) {
    // multiply vertex by compound_transform
    // `final_vertex = Matrix.multiply(...)`
    
    //var final_vertex = new Vector(4); // change / remove this
    final_vertex = Matrix.multiply([compound_transform, vertex]); 

    return final_vertex;
}

// automatically called whenever user modifies a transform (changes type or values)
function ChangeTransform(index, type, values) {
    app.transforms[index].type = type;
    
    // update `app.transforms[index].mat4x4`
    if(type.valueOf() === "translate") app.transforms[index].mat4x4 = Mat4x4Translate(new Matrix(4, 4), values[0], values[1], values[2]); 
    else if(type.valueOf() === "scale") app.transforms[index].mat4x4 = Mat4x4Scale(new Matrix(4, 4), values[0], values[1], values[2]); 
    else if(type.valueOf() === "rotate_x") app.transforms[index].mat4x4 = Mat4x4RotateX(new Matrix(4, 4), values[0]); 
    else if(type.valueOf() === "rotate_y") app.transforms[index].mat4x4 = Mat4x4RotateY(new Matrix(4, 4), values[0]); 
    else if(type.valueOf() === "rotate_z") app.transforms[index].mat4x4 = Mat4x4RotateZ(new Matrix(4, 4), values[0]); 
    else app.transforms[index].mat4x4 = Mat4x4Identity(new Matrix(4, 4))

    // recalculate compound transform and tranformed vertex
    app.compound = CalculateCompoundTransform(app.transforms);
    app.final_vertex = CalculateTransformedVertex(app.vertex);
}
