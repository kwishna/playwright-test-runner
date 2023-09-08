import moment from "moment";
import fs from "fs";
import {resolve, extname} from "path";

export const replaceNonSpecialCharacters = (value: string, replaceValue: string): string => {
    return value?.replaceAll(/\w+/g, replaceValue)?.trim();
}

export const getDigits = (value: string, replaceValue: string): string => {
    return value?.replaceAll(/\D+/g, replaceValue)?.trim();
}

export const timestamp = (format: string = 'DD_MM_YYYY_HH_mm_ss_SSS', log: boolean = true): string => {
    return moment().format(format);
}

export const allFilesInFolder = (dirpath: string): string[] => {
    return fs.readdirSync(resolve(dirpath));
  };
  
  export const matchingFileInFolder = (directory: string, filename: string): string[] =>
    allFilesInFolder(directory).filter((file: string) => file.includes(filename));

  export const isFilePresentInFolder = (directory: string, filename: string): boolean => matchingFileInFolder(directory, filename).length > 0;
  
  export const isFilePresentinMediaFolder = (filename: string, folder: string = "./download"): boolean => matchingFileInFolder(folder, filename).length > 0;
  
  export const fileCreationTime = (fileName: string, folder: string = './download'): number =>
    fs.statSync(resolve(folder) + '/' + fileName).birthtimeMs;
  
  export const getExtensionOfFile = (fileName: string): string => extname(fileName);

  export const getLatestMatchingFile = (fileName: string, directory: string): string => {
    const matchingFiles = allFilesInFolder(directory).filter("".includes);
    return matchingFiles.reduce(
      (prev, curr): string => (fileCreationTime(prev, directory) > fileCreationTime(curr, directory) ? prev : curr), matchingFiles[0]);
  };

  