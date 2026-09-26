// ======================================
// STUDENT PERFORMANCE ANALYZER
// ======================================

console.log("Student Performance Analyzer loaded");


// ======================================
// GET HTML ELEMENTS
// ======================================

const addStudentBtn =
    document.getElementById("openModal");

const modal =
    document.getElementById("studentModal");

const closeModalBtn =
    document.getElementById("closeModal");

const cancelModalBtn =
    document.getElementById("cancelModal");

const studentForm =
    document.getElementById("studentForm");


// ======================================
// STUDENT DATA
// ======================================

// Get previously saved students
let students =
    JSON.parse(localStorage.getItem("students")) || [];


// ======================================
// OPEN MODAL
// ======================================

addStudentBtn.addEventListener("click", function () {

    modal.classList.add("show");

});


// ======================================
// CLOSE MODAL
// ======================================

function closeModal() {

    modal.classList.remove("show");

    studentForm.reset();

}


closeModalBtn.addEventListener(
    "click",
    closeModal
);


cancelModalBtn.addEventListener(
    "click",
    closeModal
);


// ======================================
// CLOSE WHEN CLICKING OUTSIDE
// ======================================

modal.addEventListener(
    "click",
    function (event) {

        if (event.target === modal) {

            closeModal();

        }

    }
);


// ======================================
// FORM SUBMISSION
// ======================================

studentForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // ==================================
        // GET STUDENT INFORMATION
        // ==================================

        const name =
            document
                .getElementById("studentName")
                .value
                .trim();


        const rollNumber =
            document
                .getElementById("rollNumber")
                .value
                .trim();


        // ==================================
        // GET MARKS
        // ==================================

        const maths =
            Number(
                document
                    .getElementById("maths")
                    .value
            );


        const java =
            Number(
                document
                    .getElementById("java")
                    .value
            );


        const dbms =
            Number(
                document
                    .getElementById("dbms")
                    .value
            );


        const web =
            Number(
                document
                    .getElementById("web")
                    .value
            );


        const aiml =
            Number(
                document
                    .getElementById("aiml")
                    .value
            );


        // ==================================
        // SUBJECTS OBJECT
        // ==================================

        const subjects = {

            Mathematics: maths,

            Java: java,

            DBMS: dbms,

            "Web Technology": web,

            "AI / ML": aiml

        };


        // ==================================
        // TOTAL
        // ==================================

        const total =
            maths +
            java +
            dbms +
            web +
            aiml;


        // ==================================
        // PERCENTAGE
        // ==================================

        const percentage =
            total / 5;


        // ==================================
        // GRADE
        // ==================================

        let grade;


        if (percentage >= 90) {

            grade = "A+";

        }

        else if (percentage >= 80) {

            grade = "A";

        }

        else if (percentage >= 70) {

            grade = "B";

        }

        else if (percentage >= 60) {

            grade = "C";

        }

        else if (percentage >= 50) {

            grade = "D";

        }

        else {

            grade = "F";

        }


        // ==================================
        // FIND WEAKEST SUBJECT
        // ==================================

        let weakestSubject = "";

        let lowestMarks = Infinity;


        for (
            const subject in subjects
        ) {

            if (
                subjects[subject] < lowestMarks
            ) {

                lowestMarks =
                    subjects[subject];

                weakestSubject =
                    subject;

            }

        }


        // ==================================
        // STUDENT STATUS
        // ==================================

        let status;


        if (
            percentage < 40 ||
            lowestMarks < 35
        ) {

            status = "At Risk";

        }

        else if (
            percentage < 60
        ) {

            status = "Needs Focus";

        }

        else {

            status = "Good";

        }


        // ==================================
        // CREATE STUDENT OBJECT
        // ==================================

        const student = {

            name: name,

            rollNumber: rollNumber,

            maths: maths,

            java: java,

            dbms: dbms,

            web: web,

            aiml: aiml,

            total: total,

            percentage: percentage,

            grade: grade,

            weakestSubject: weakestSubject,

            status: status

        };


        // ==================================
        // SAVE STUDENT
        // ==================================

        students.push(student);


        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );


        // ==================================
        // UPDATE DASHBOARD
        // ==================================

        displayStudents();

        updateStatistics();


        // ==================================
        // CONSOLE
        // ==================================

        console.log(
            "Student Added:",
            student
        );


        // ==================================
        // CLOSE MODAL
        // ==================================

        closeModal();


        // ==================================
        // SHOW RESULT
        // ==================================

        alert(

            `${name} added successfully!\n\n` +

            `Roll Number: ${rollNumber}\n` +

            `Total: ${total}/500\n` +

            `Percentage: ${percentage.toFixed(1)}%\n` +

            `Grade: ${grade}\n` +

            `Weak Subject: ${weakestSubject}\n` +

            `Status: ${status}`

        );

    }
);


// ======================================
// DISPLAY STUDENTS ON DASHBOARD
// ======================================

function displayStudents() {

    const studentTable =
        document.querySelector(".student-table");


    // Keep table heading

    studentTable.innerHTML = `

        <div class="table-header">

            <span>Student</span>

            <span>Performance</span>

            <span>Weak Subject</span>

            <span>Status</span>

        </div>

    `;


    // Add saved students

    students.forEach(function (student) {


        // Get initials

        const nameParts =
            student.name.split(" ");


        let initials =
            nameParts[0].charAt(0);


        if (nameParts.length > 1) {

            initials +=
                nameParts[
                    nameParts.length - 1
                ].charAt(0);

        }


        // Status class

        let statusClass = "warning";


        if (student.status === "At Risk") {

            statusClass = "danger";

        }


        // Add row

        studentTable.innerHTML += `

            <div class="table-row">

                <div class="student-info">

                    <div class="avatar">

                        ${initials.toUpperCase()}

                    </div>

                    <div>

                        <strong>
                            ${student.name}
                        </strong>

                        <small>
                            Roll No. ${student.rollNumber}
                        </small>

                    </div>

                </div>


                <strong>

                    ${student.percentage.toFixed(1)}%

                </strong>


                <span>

                    ${student.weakestSubject}

                </span>


                <span class="status ${statusClass}">

                    ${student.status}

                </span>

            </div>

        `;

    });

}


// ======================================
// UPDATE DASHBOARD STATISTICS
// ======================================

function updateStatistics() {


    // ----------------------------------
    // Total Students
    // ----------------------------------

    const totalStudents =
        120 + students.length;


    document
        .querySelectorAll(".stat-card h3")[0]
        .textContent =
        totalStudents;


    // ----------------------------------
    // Class Average
    // ----------------------------------

    if (students.length > 0) {

        const totalPercentage =
            students.reduce(
                function (sum, student) {

                    return sum +
                        student.percentage;

                },
                0
            );


        const average =
            totalPercentage /
            students.length;


        document
            .querySelectorAll(".stat-card h3")[1]
            .textContent =
            average.toFixed(1) + "%";

    }


    // ----------------------------------
    // At Risk
    // ----------------------------------

    const atRiskStudents =
        students.filter(
            function (student) {

                return student.status ===
                    "At Risk";

            }
        );


    document
        .querySelectorAll(".stat-card h3")[3]
        .textContent =
        12 + atRiskStudents.length;

}


// ======================================
// LOAD SAVED STUDENTS WHEN PAGE OPENS
// ======================================

displayStudents();

updateStatistics();