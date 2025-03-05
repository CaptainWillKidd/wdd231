document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;

    const lastModified = document.lastModified;
    document.getElementById("lastmodified").textContent = `Last Modified: ${lastModified}`;

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navigation");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: [
                'HTML',
                'CSS'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: [
                'C#'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false
        }
    ];

    const dynamicContent = document.getElementById('dynamic-content');
    let currentFilter = 'all';
    
    const filterButtons = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All Courses</button>
            <button class="filter-btn" data-filter="WDD">WDD Courses</button>
            <button class="filter-btn" data-filter="CSE">CSE Courses</button>
        </div>
        <div class="credits-total"></div>
    `;
    dynamicContent.insertAdjacentHTML('afterbegin', filterButtons);

    function renderCourses(filter = 'all') {
        const filteredCourses = courses.filter(course => {
            if (filter === 'all') return true;
            return course.subject === filter;
        });

        const coursesHTML = filteredCourses.map(course => `
            <div class="course-card ${course.completed ? 'completed' : ''}">
                <h3>${course.subject} ${course.number} - ${course.title}</h3>
                <p>${course.description}</p>
                <div class="tech-list">
                    ${course.technology.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
                </div>
                <p class="credits">Credits: ${course.credits}</p>
            </div>
        `).join('');

        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        
        dynamicContent.innerHTML = filterButtons + coursesHTML;
        document.querySelector('.credits-total').textContent = `Total Credits Required: ${totalCredits}`;
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderCourses(currentFilter);
        }
    });

    renderCourses();
});