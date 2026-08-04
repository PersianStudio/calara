import { SxProps, Theme } from '@mui/material/styles';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { DropzoneOptions } from 'react-dropzone';
// ----------------------------------------------------------------------

export interface ExtendFile extends File {
  preview?: string;
  path?: string;
  lastModifiedDate?: string;
}

export enum FileMimeTypesEnum {
  PNG = 'image/png',
  JPG = 'image/jpeg',
  IMAGE = 'image/*',
  EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  CSV = 'text/csv',
  PDF = 'application/pdf',
  TXT = 'text/plain',
  DOC = 'application/msword',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

// Object for file extensions
export const FileExtensionTypes = {
  PNG: ['.png'],
  JPG: ['.jpg', '.jpeg'],
  IMAGE: ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp'],
  EXCEL: ['.xlsx', '.xls'],
  CSV: ['.csv'],
  PDF: ['.pdf'],
  TXT: ['.txt'],
  DOC: ['.doc'],
  DOCX: ['.docx'],
};

export type FileFormat = 'txt' | 'zip' | 'image' | 'word' | 'excel' | 'powerpoint' | 'pdf';
export type initialFileType = {
  fileName: string;
  fileSize: number;
  format: FileFormat;
  onRemove?: VoidFunction;
};

// Type to map MIME type strings to file extensions
type AcceptType = Partial<{
  [K in FileMimeTypesEnum]: (typeof FileExtensionTypes)[keyof typeof FileExtensionTypes];
}>;
export interface UploadProps extends Omit<DropzoneOptions, 'accept'> {
  variant?: 'dotted' | 'outlined';
  error?: boolean;
  shape?: 'circle' | 'square';
  accept?: AcceptType;
  sx?: SxProps<Theme>;
  containerSx?: SxProps<Theme>;
  label?: string;
  helperText?: string;
  placeholderText?: string;
  customPlaceHolder?: ReactNode;
  limitationSize?: number;
  //
  file?: File | null;
  //
  files?: File[];
  initialFiles?: initialFileType[];
  onUpload?: VoidFunction;
  onRemove?: (file: File) => void;
  required?: boolean;
  setFile?: Dispatch<SetStateAction<File | null>>;
  setFiles?: Dispatch<SetStateAction<File[]>>;
  onChange?: (target: any) => void;
  noPreview?: boolean;
  loading?: boolean;
  renderPlaceholder?: JSX.Element;
}

export type FileProp = {
  name: string;
  type: string;
  size: number;
};
