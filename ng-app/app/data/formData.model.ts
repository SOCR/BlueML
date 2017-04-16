export class FormData  {

    trainingData: string = '';
    training_Data: training_data[]= [];
    user_ecg_data: user_data[]= [];
    //algorithms: Algorithm[] = [];
    algorithm: string = '';
    features: string[] = [];

}




export class user_data{

    name: string = '';
    path: string = '';

    file_meta_data: meta_data[];

}

export class meta_data{
    key: string = '';
    value: string = '';

}


export class algorithm{
    name: string = '';

}

export class Feature{
    name: string = '';
}


export class training_data{
    name: string = '';
    path: string = '';




}

