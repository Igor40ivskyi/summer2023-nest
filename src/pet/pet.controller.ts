import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/pet.dto';

@ApiTags('Pet')
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get('list')
  async getPetList() {
    return this.petService.getPetList();
  }

  @Get(':petId')
  async getPetSingle(@Param('petId') petId: string) {
    return this.petService.getPetSingle(petId);
  }

  @Post('create')
  async createPetSingle(@Res() res: any, @Body() body: CreatePetDto) {
    this.petService.createPet(body);

    return res.status(HttpStatus.CREATED).json();
  }

  @Put('update/:petId')
  async updatePetSingle(
    @Res() res: any,
    @Param('petId') petId: string,
    @Body() body: CreatePetDto,
  ) {
    return res
      .status(HttpStatus.CREATED)
      .json(this.petService.updatePetSingle(petId, body));
  }

  @Delete(':petId')
  async deletePetSingle(@Res() res: any, @Param('petId') petId: string) {
    const deletedPet = await this.petService.deletePetSingle(petId);

    return res.status(200).json(deletedPet);
  }
}
