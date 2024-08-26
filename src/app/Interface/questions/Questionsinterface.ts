interface Option {
    optionText: string;
    isCorrect: boolean;
  }
  
  interface Question {
    questionNumber: number;
    questionText: string;
    options: Option[];
  }