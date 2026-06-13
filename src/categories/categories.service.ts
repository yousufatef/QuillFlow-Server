import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const { nameEn, nameAr } = createCategoryDto;
    const category = await this.categoryRepository.findOne({
      where: [{ nameEn }, { nameAr }],
    });
    if (category) {
      throw new ConflictException('common.categories.alreadyExists');
    }
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('common.categories.notFound');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (updateCategoryDto.nameEn || updateCategoryDto.nameAr) {
      const existingCategory = await this.categoryRepository.findOne({
        where: [
          ...(updateCategoryDto.nameEn ? [{ nameEn: updateCategoryDto.nameEn }] : []),
          ...(updateCategoryDto.nameAr ? [{ nameAr: updateCategoryDto.nameAr }] : []),
        ],
      });
      if (existingCategory && existingCategory.id !== id) {
        throw new ConflictException('common.categories.alreadyExists');
      }
    }
    category.nameEn = updateCategoryDto.nameEn ?? category.nameEn;
    category.nameAr = updateCategoryDto.nameAr ?? category.nameAr;
    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
    return null;
  }
}
