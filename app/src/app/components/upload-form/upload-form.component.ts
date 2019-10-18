import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UploadService } from 'src/app/services/upload/upload.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
  host: {
    'class': "layout layout--center width100"
  }
})
export class UploadFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private cd: ChangeDetectorRef, private uploadService: UploadService) {}

  uploadForm = this.formBuilder.group({
    fileStream: [null, Validators.required],
    fileName: [null, Validators.required],
    fileSize: [null, Validators.required],
  })

  markDown: string;

  ngOnInit() {
    
  }

  uploadFile(form_values) {
    console.log(form_values);
    this.uploadService.sendMinIO(form_values).then(res => {
      console.log(res);

    }).catch(err => {
      console.log(err);
    })
  }

  getMarkdown() {
    this.uploadService.getFileMinIO({
      fileName: "test.md",
      bucketName: "mybucket"
    }).then(res =>{
      console.log("Response from APIs", res);
      this.markDown = atob(res);
    }).catch(err => {
      console.log(err);
    })
  }
  onFileChanged(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      this.uploadForm.patchValue({
        fileName: file.name,
        fileSize: file.size
      });

      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.uploadForm.patchValue({
          fileStream: reader.result
        });
        
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }
}
