import { uploadDataComponent }      from './uploadData/uploadData.component';
import { trainingDataComponent }   from './trainingData/trainingData.component';
import { analysisComponent }  from './analysis/analysis.component';
import { resultComponent }    from './result/result.component';
import { homeComponent }  from './homepage/home.component';

export const appStates = [
    // 1st State
    { name: 'home', url: '/home',  component: homeComponent },

    { name: 'trainingData', url: '/trainingData',  component: trainingDataComponent },
    // 2nd State:
    { name: 'uploadData', url: '/uploadData',  component: uploadDataComponent },
    // 3rd State
    { name: 'analysis', url: '/analysis',  component: analysisComponent },
    // 4th State
    { name: 'result', url: '/result',  component: resultComponent }
];
