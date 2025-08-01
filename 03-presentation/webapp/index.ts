import ComponentContainer from "sap/ui/core/ComponentContainer";

new ComponentContainer({
    id: "container",
    name: "presentation",
    settings: {
        id: "app"
    },
    autoPrefixId: true,
    async: true
}).placeAt("content");
