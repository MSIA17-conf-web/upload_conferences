import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  sendMinIO(values): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log("Sending image to MinIO..", values);
      this.httpClient
        .post("https://msia17conferences.com:9010/api", {
          method: "PUT",
          url: "createFile",
          baseURL: "http://minio_api:9010",
          // headers: {
          //   "Access-Control-Allow-Origin": "*",
          //   "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
          // },
          body: {
            fileName: values.fileName,
            bucketName: "mybucket",
            fileStream: values.fileStream,
            fileSize: values.fileSize
          }
        }).subscribe(res => {
          console.log("Response from APIs", res);
          resolve();
        }, err => {
          console.log("Error from APIs", err);
          reject();
        })
    })
  }

  getFileMinIO(body): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log("Getting file from MinIO :", body);
      this.httpClient
        .post("https://msia17conferences.com:9010/api", {
          method: "POST",
          url: "getFile",
          baseURL: "http://minio_api:9010",
          // headers: {
          //   "Access-Control-Allow-Origin": "*",
          //   "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
          // },
          body: {
            fileName: body.fileName,
            bucketName: body.bucketName,
          }
        }).subscribe(function(res: any) {
          // console.log("Response from APIs 1", res.result.fileStream);
          resolve(res.result.fileStream);
        }, err => {
          // console.log("Error from APIs", err);
          reject(err);
        })
    })
  }
}
