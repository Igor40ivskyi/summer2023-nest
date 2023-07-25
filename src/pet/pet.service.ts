import { Injectable } from '@nestjs/common';

@Injectable()
export class PetService {
  private petsList = [];

  getPetList() {
    return this.petsList;
  }

  getPetSingle(petId: string) {
    return this.petsList.find((item) => item.id.toString() === petId);
  }

  createPet(data) {
    this.petsList.push(data);
  }

  updatePetSingle(petId: string, data) {
    const indexForUpdate = this.petsList.findIndex(
      (item) => item.id.toString() === petId,
    );

    this.petsList[indexForUpdate] = data;

    return this.petsList[indexForUpdate];
  }

  deletePetSingle(petId: string) {
    const indexForDelete = this.petsList.findIndex(
      (item) => item.id === +petId,
    );

    if (indexForDelete !== -1) {
      return this.petsList.splice(indexForDelete, 1);
    }

    return 'xxx';
  }
}
