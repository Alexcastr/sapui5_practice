import ComponentContainer from "sap/ui/core/ComponentContainer";

new ComponentContainer({
    id: "container",
    name: "02-project-ts",
    settings: {
        id: "02-project-ts"
    },
    autoPrefixId: true,
    async: true
}).placeAt("content");