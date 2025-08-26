"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDonorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_donor_dto_1 = require("./create-donor.dto");
class UpdateDonorDto extends (0, mapped_types_1.PartialType)(create_donor_dto_1.CreateDonorDto) {
}
exports.UpdateDonorDto = UpdateDonorDto;
//# sourceMappingURL=update-donor.dto.js.map