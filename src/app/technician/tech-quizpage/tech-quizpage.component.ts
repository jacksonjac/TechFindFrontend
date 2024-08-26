import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TechAuthService } from 'src/app/Servies/Technician/tech-auth.service';
import { ToastService } from 'src/app/Servies/Toster/toast-service.service';

@Component({
  selector: 'app-tech-quizpage',
  templateUrl: './tech-quizpage.component.html',
  styleUrls: ['./tech-quizpage.component.scss']
})

export class TechQuizpageComponent implements OnInit {
  questionsToShow: any[] = []; // Array to hold randomly selected questions
  currentQuestionIndex: number = 0;
  currentQuestion: any;
  timer: any;
  timeLeft: number = 10;  // 10 seconds for each question
  correctAnswersCount: number = 0;
  designation: string | undefined;  // Variable to store the designation value

  constructor(
    private toaster: ToastService,
    private router: Router,
    private auth: TechAuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieve the designation from query parameters
    this.route.queryParams.subscribe(params => {
      this.designation = params['designation'];
      console.log('Designationid:', this.designation);
      // Fetch questions after retrieving the designation
      this.fetchQuestionList();
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  fetchQuestionList() {
    this.auth.getAllQuestionsbyId(this.designation).subscribe(
      (response: any) => {

        console.log(response,"the question lists")
        if (response.status) {
          const shuffled = response.data.sort(() => Math.random() - 0.5);
          this.questionsToShow = shuffled.slice(0, 3);
          this.currentQuestion = this.questionsToShow[this.currentQuestionIndex];
          this.startTimer();
        } else {
          console.error('Error fetching questions:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  startTimer() {
    this.timeLeft = 10;
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.onNextClick();
      }
    }, 1000);
  }

  onNextClick() {
    clearInterval(this.timer);
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questionsToShow.length) {
      this.currentQuestion = this.questionsToShow[this.currentQuestionIndex];
      this.startTimer();
    } else {
      console.log('End of quiz');
      console.log('Correct Answers Count:', this.correctAnswersCount);

      // Check if all answers are correct
      if (this.correctAnswersCount === this.questionsToShow.length) {
        this.toaster.CorrectAnswer('Congratulations!', 'You passed the quiz.');
        // Navigate to '/technician/signup'
        this.router.navigate(['/technician/signup']);
      } else {
        this.toaster.Info('Sorry!', 'Better luck next time. You failed the quiz.');
        // Navigate to '/technician/login'
        this.router.navigate(['/technician/login']);
      }
    }
  }

  onOptionSelected(option: string) {
    clearInterval(this.timer);

    // Debugging: log the selected option and the correct answer
    console.log('Selected option:', option);
    console.log('Correct answer:', this.currentQuestion.correctAnswer);

    if (option === this.currentQuestion.correctAnswer) {
      this.correctAnswersCount++;
      this.toaster.CorrectAnswer('Correct', 'You selected the correct answer.');
    } else {
      this.toaster.Wronganswer('Wrong', `You selected the wrong answer. The correct answer is ${this.currentQuestion.correctAnswer}.`);
    }

    setTimeout(() => {
      this.onNextClick();
    }, 2000);
  }
}