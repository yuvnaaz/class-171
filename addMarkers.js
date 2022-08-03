AFRAME.registerComponent("create-markers",{
init: async function(){
    var scene = document.querySelector("#main-scene")
    var dishes = await this.getDishes()
    dishes.map(dish=>{
        var marker = document.createElement("a-marker")
        marker.setAttribute("id", dish.id)
        marker.setAttribute("type", "pattern")
        marker.setAttribute("url", dish.marker_pattern_url)
        marker.setAttribute("cursor", {rayOrigin: "mouse"})
        marker.setAttribute("handler", {})
        scene.appendChild(marker)

        var model = document.createElement("a-entity")
        model.setAttribute("id", `model-${dish.id}`)
        model.setAttribute("position", dish.model_geometry.position)
        model.setAttribute("rotation", dish.model_geometry.rotation)
        model.setAttribute("scale", dish.model_geometry.scale)
        model.setAttribute("gltf-model",`url(${dish.model_url})`)
        model.setAttribute("gesture-handler", {})
        marker.appendChild(model)

        var plane = document.createElement("a-plane")
        plane.setAttribute("id", `plane-${dish.id}`)
        plane.setAttribute("position", {x:1, y:0, z:0})
        plane.setAttribute("rotation", {x:-90, y:0, z:0})
        plane.setAttribute("width", 1.7)
        plane.setAttribute("height", 1.5)
        marker.appendChild(plane)
        
        var titlePlane = document.createElement("a-plane")
        titlePlane.setAttribute("id", `titlePlane-${dish.id}`)
        titlePlane.setAttribute("position", {x:1, y:0.89,z:0.02})
        titlePlane.setAttribute("rotation", {x:0, y: 0, z:0})
        titlePlane.setAttribute("width", 1.69)
        titlePlane.setAttribute("height", 0.3)
        titlePlane.setAttribute("material", {color: "#f0c30f"})
        plane.appendChild(titlePlane)

        var dishTitle = document.createElement("a-entity")
        dishTitle.setAttribute("id", `dishTitle-${dish.id}`)
        dishTitle.setAttribute("position", {x: 1, y: 0, z:0.1})
        dishTitle.setAttribute("rotation", {x:0, y:0, z:0})
        dishTitle.setAttribute("text", {font:"monoid", color:"black", width: 1.8, height: 1, align: "center", value: dish.dish_name.toUpperCase()})
        titlePlane.appendChild(dishTitle)

        var ingredients = document.createElement("a-entity")
        ingredients.setAttribute("id", `ingredients-${dish.id}`)
        ingredients.setAttribute("position", {x:1.3, y: 0, z:0.1})
        ingredients.setAttribute("rotation", {x:0, y:0, z:0})
        ingredients.setAttribute("text",{font:"monoid", color:"black", width: 1.8, height: 1, align: "center", value: `${dish.ingredients.join("\n\n")}`})
        plane.appendChild(ingredients)

        var pricePlane = document.createElement("a-image")
        pricePlane.setAttribute("id", `pricePlane-${dish.id}`)
        pricePlane.setAttribute("position", {x:-0.3, y:0,z:0.03})
        pricePlane.setAttribute("rotation", {x:-90, y: 0, z:0})
        pricePlane.setAttribute("width", 0.8)
        pricePlane.setAttribute("height", 0.8)
        pricePlane.setAttribute("src", "https://raw.githubusercontent.com/whitehatjr/web-ar-assets/main/black-circle.png")
        marker.appendChild(pricePlane)

        var price = document.createElement("a-entity")
        price.setAttribute("id", `price-${dish.id}`)
        price.setAttribute("position", {x: -0.3, y: 0.05, z:0.1})
        price.setAttribute("rotation", {x:0, y:0, z:0})
        price.setAttribute("text", {font:"monoid", color:"white", width: 3, height: 1, align: "center", value: `$${dish.price}`})
        pricePlane.appendChild(price)



    })

},
getDishes: async function(){
    return await firebase.firestore().collection("dishes").get().then(snap=>{
        return snap.docs.map(doc=>doc.data())
    })


    


}

})