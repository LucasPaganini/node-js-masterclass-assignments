import { readdir } from 'fs'

export const listDirectoryFiles = (dirPath: string): Promise<string[]> =>
  new Promise((resolve, reject) => {
    readdir(dirPath, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })
