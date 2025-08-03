import ComponentContainer from "sap/ui/core/ComponentContainer";

new ComponentContainer({
    id: "container",
    name: "test2",
    settings: {
        id: "test2",
    },
    autoPrefixId: true,
    async: true
}).placeAt("content");
