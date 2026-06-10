import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import type { Response } from "express";


@Controller('api/uploads')
export class UploadsController {

    // Handle file upload with validation and custom storage configuration
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    public uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) throw new BadRequestException('File is required');
        console.log('File uploaded:', { file });
        return { message: 'File uploaded successfully' };
    }

    // Handle files upload with validation and custom storage configuration
    @Post("multiple-files")
    @UseInterceptors(FilesInterceptor('files'))
    public uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
        if (!files || files.length === 0) throw new BadRequestException('Files are required');
        console.log('Files uploaded:', { files });
        return { message: 'Files uploaded successfully' };
    }

    //Get Image
    @Get(':image')
    public getImage(@Param('image') image: string, @Res() res: Response) {
        return res.sendFile(image, { root: './uploads' });
    }
}