var compound_transform;

// automatically called whenever any transform changes
function CalculateCompoundTransform(transforms) {
    // matrices in `transforms[i].mat4x4`
    // note `transform[0]` is first tranform to apply to vertex
    
    // if only one transform, set compound transform equal to it
    // otherwise multiply all matrices together (in proper order)
    // `compound_transform = Matrix.multiply(...)`
    var tranform_matrices = [];
    
    compound_transform = transforms[0]; 
    for(var i = 1; i < transforms.length; i++) {
        compound_transform = Matrix.multiply(compound_transform, transforms[i]); 
    }
    //compound_transform = new Matrix(4, 4); // change / remove this

    return compound_transform;
}

// automatically called whenever compound transform changes
function CalculateTransformedVertex(vertex) {
    // multiply vertex by compound_transform
    // `final_vertex = Matrix.multiply(...)`
    
    var final_vertex = Matrix.multiply(vertex, compound_transform); 
    //var final_vertex = new Vector(4); // change / remove this

    return final_vertex;
}

// automatically called whenever user modifies a transform (changes type or values)
function ChangeTransform(index, type, values) {
    app.transforms[index].type = type;
    // update `app.transforms[index].mat4x4`

    // recalculate compound transform and tranformed vertex
    app.compound = CalculateCompoundTransform(app.transforms);
    app.final_vertex = CalculateTransformedVertex(app.vertex);
}
