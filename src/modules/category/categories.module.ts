import { Module } from '@nestjs/common' ;
import { MongooseModule } from '@nestjs/mongoose' ;
import { RolesModule } from 'modules/roles/roles.module' ;
import { CategoriesController } from './categories.controller' ;
import { CategoriesRepository } from './categories.repository' ;
import { CategoriesService } from './categories.service' ;
import { Category , CategorySchema } from './schemas/category.schema' ;
@Module ({
    imports: [ MongooseModule . forFeature ([{ name: Category . name , schema: CategorySchema }]), RolesModule ],
    controllers: [ CategoriesController ],
    providers: [ CategoriesService , CategoriesRepository ],
    exports: [ CategoriesService ],

})