import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { CurrentUser, CommonAuthGuard, UserDto } from '@app/common';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) { }

  @UseGuards(CommonAuthGuard)
  @Post()
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.reservationsService.create(createReservationDto, user);
  }

  @Get()
  @UseGuards(CommonAuthGuard)
  async findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  @UseGuards(CommonAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(CommonAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  @UseGuards(CommonAuthGuard)
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
