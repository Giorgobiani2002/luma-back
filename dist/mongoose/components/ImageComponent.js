"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ImageComponent = ({ record, property }) => {
    const imageUrl = record?.params?.[property.path];
    console.log('DEBUG record.params:', record.params);
    console.log('DEBUG property.path:', property.path);
    if (!imageUrl) {
        return (0, jsx_runtime_1.jsx)("span", { children: "No image" });
    }
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("a", { href: imageUrl, target: "_blank", rel: "noopener noreferrer", children: (0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "Preview", style: {
                    maxWidth: '100px',
                    maxHeight: '100px',
                    objectFit: 'contain',
                    borderRadius: '6px',
                } }) }) }));
};
exports.default = ImageComponent;
//# sourceMappingURL=ImageComponent.js.map