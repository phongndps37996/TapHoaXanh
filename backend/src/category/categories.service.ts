import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './categories.reposirory';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    const saveCategory = this.categoryRepository.save(category);
    return saveCategory;
  }

  async findAll() {
    return await this.categoryRepository.findAll();
  }

  findOne() {
    return `ghghgh`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
