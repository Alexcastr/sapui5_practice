sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], (Controller, MessageToast) => {
	"use strict";

	return Controller.extend("sapui5.quickstart.App", {  // sapui5.quickstart.App es el nombre del controlador
		onPress() {
			MessageToast.show("Hello App!");
		}
	});

});