import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { CommonAuthGuard, CurrentUser, UserDto } from '@app/common';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) { }

  @UseGuards(CommonAuthGuard)
  @Post()
  async create(@Body() createReservationDto: CreateReservationDto, @CurrentUser() user: UserDto) {
    return await this.reservationsService.create(createReservationDto, user._id);
  }

  @UseGuards(CommonAuthGuard)
  @Get()
  async findAll() {
    return await this.reservationsService.findAll();
  }

  @UseGuards(CommonAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.reservationsService.findOne(id);
  }

  @UseGuards(CommonAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return await this.reservationsService.update(id, updateReservationDto);
  }

  @UseGuards(CommonAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.reservationsService.remove(id);
  }
}
