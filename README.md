# Hot Lecture Digest 🔥

<img src="https://user-images.githubusercontent.com/54666446/119255797-8609ba00-bbf8-11eb-89dd-aa43c1c476f5.png" width="300" height="300">

*Your week is here.*

Hot Lecture Digest is a program that consists of two core parts. One is the 'speech-to-text' tool that coverts Kingos' lecture into script, and the other is an administration tool with GUI which organizes your school-week. Hot Lecture Digest will be an ultimate weapon for Kingos to manage school works in these difficult days due to the pandemic.

## **License - MIT license** ⚖️

Hot Lecture Digest is released under the terms of the MIT license. Click [here](https://github.com/OSSP-group-5/hot-lecture-digest/blob/main/LICENSE) for more information or see the [original](https://opensource.org/licenses/MIT).

## **Links to resources**

- [i-Campus](http://canvas.skku.edu)
- [SKKU](http://skku.edu)

Get lecture files from i-Campus with proper permission.

## **Installation**

### **Things to do**

- installation instruction
- how to use google API
- how to use the app
- screenshots
- demo video-youtube links 
- examples 

여기에 사용방법이 들어가야 할 듯 합니다.

## **API reference**

In package.json

```json
"devDependencies": {
    "electron": "^12.0.7",
    "jest": "^26.6.3"
  },
"dependencies": {
    "@google-cloud/speech": "^4.5.0",
    "@google-cloud/storage": "^5.8.5",
    "electron-require": "^0.3.0",
    "fluent-ffmpeg": "^2.1.2",
    "node-summarizer": "^1.0.7",
    "path": "^0.12.7"
  }
```

- [electron](https://github.com/electron/electron#readme)
- [jest](https://jestjs.io/)
- [google-cloud/speech](https://github.com/googleapis/nodejs-speech#readme)
- [google-cloud/storage](https://github.com/googleapis/nodejs-storage#readme)
- [electron-require](https://github.com/brrd/electron-require#readme)
- [fluent--ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#readme)
- [node-summarizer](https://github.com/SwapnikKatkoori/node-summarizer#readme)
- [path](https://nodejs.org/docs/latest/api/path.html)

## **Examples**

### CLI
![image](https://user-images.githubusercontent.com/38829593/119342372-f3d4e500-bccf-11eb-85fb-3a899c17851c.png)
- "summarize" command: ![image](https://user-images.githubusercontent.com/38829593/119342476-1961ee80-bcd0-11eb-8128-97b616984fde.png)


### User Interface
![tempsnip](https://user-images.githubusercontent.com/38829593/119261056-8f9f1c00-bc10-11eb-9e3f-fb219eea05fc.png)
- Red box: Area for displaying registered courses. Click on the course to select specific course.
- Blue box: Area for the list of lectures imported for the selected course. Click lecture to view textual information on the lecture. Toggle between "Full-Text" and "Summary" to view each of the following.
    Full-Text: Area for the textual information of the whole lecture obtained with google speech API
    Summary: Summarized version of the Full-Text using node-summary module.
- Green box: Area for the textual information of the whole lecture or the summary.


### Input
![tempsnip1](https://user-images.githubusercontent.com/38829593/119261393-2c15ee00-bc12-11eb-8fc7-14cf1934b359.png)
- Red box: For course input. Receive course name and professor, and a course instance will be created.
- Blue box: For lecture input. A pop-up will appear at the bottom right corner of the display.

### Pop-up for Lecture Input
![tempsnip2](https://user-images.githubusercontent.com/38829593/119261611-1d7c0680-bc13-11eb-8ba9-0d3e9842aaff.png)
- Pop-up: Receives course, name, week, due date, and text files from the user to make a lecture instance. (Videos are transformed into text files via backend functions)





### Demonstration Video
Pending for update.

## **Releases (versions)***********************************

## **How to contribute**

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

### **We Develop with Github**

We use github to host code, to track issues and feature requests, as well as accept pull requests.

### **We Use [Github Flow](https://guides.github.com/introduction/flow/index.html), So All Code Changes Happen Through Pull Requests**

Pull requests are the best way to propose changes to the codebase (we use [Github Flow](https://guides.github.com/introduction/flow/index.html)). We actively welcome your pull requests:

1. Fork the repo and create your branch from `master`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

### **Any contributions you make will be under the MIT Software License**

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

### **Report bugs using Github's [issues](https://github.com/OSSP-group-5/hot-lecture-digest/issues)**

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/OSSP-group-5/hot-lecture-digest/issues); it's that easy!

### **Write bug reports with detail, background, and sample code**

[This is an example](https://github.com/OSSP-group-5/hot-lecture-digest/blob/main/.github/ISSUE_TEMPLATE/bug_report.md) of a bug report I wrote, and I think it's not a bad model. Here's [another example from Craig Hockenberry](http://www.openradar.me/11905408).

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
    - Be specific!
    - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

People *love* thorough bug reports. I'm not even kidding.

### **Use a Consistent Coding Style**

I'm again borrowing these from [Facebook's Guidelines](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md)

- 2 spaces for indentation rather than tabs
- You can use .editorconfig and .prettierrc for consistent styling

### **License**

By contributing, you agree that your contributions will be licensed under its MIT License.

### **References**

This document was adapted from the open-source contribution guidelines for [Facebook's Draft](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md)

Adapted from [Contributing to Transcriptase](https://gist.github.com/briandk/3d2e8b3ec8daf5a27a62) on May 23, 2021

## **Code of Conduct**

### Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of age, body
size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status,
nationality, personal appearance, race, religion, or sexual identity
and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming,
diverse, inclusive, and healthy community.

### Our Standards

Examples of behavior that contributes to a positive environment for our
community include:

* Demonstrating empathy and kindness toward other people
* Being respectful of differing opinions, viewpoints, and experiences
* Giving and gracefully accepting constructive feedback
* Accepting responsibility and apologizing to those affected by our mistakes,
  and learning from the experience
* Focusing on what is best not just for us as individuals, but for the
  overall community

Examples of unacceptable behavior include:

* The use of sexualized language or imagery, and sexual attention or
  advances of any kind
* Trolling, insulting or derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or email
  address, without their explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of
acceptable behavior and will take appropriate and fair corrective action in
response to any behavior that they deem inappropriate, threatening, offensive,
or harmful.

Community leaders have the right and responsibility to remove, edit, or reject
comments, commits, code, wiki edits, issues, and other contributions that are
not aligned to this Code of Conduct, and will communicate reasons for moderation
decisions when appropriate.

### Scope

This Code of Conduct applies within all community spaces, and also applies when
an individual is officially representing the community in public spaces.
Examples of representing our community include using an official e-mail address,
posting via an official social media account, or acting as an appointed
representative at an online or offline event.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported to the community leaders responsible for enforcement at
poowooho3@gmail.com.
All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the
reporter of any incident.

## Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining
the consequences for any action they deem in violation of this Code of Conduct:

### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed
unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing
clarity around the nature of the violation and an explanation of why the
behavior was inappropriate. A public apology may be requested.

### 2. Warning

**Community Impact**: A violation through a single incident or series
of actions.

**Consequence**: A warning with consequences for continued behavior. No
interaction with the people involved, including unsolicited interaction with
those enforcing the Code of Conduct, for a specified period of time. This
includes avoiding interactions in community spaces as well as external channels
like social media. Violating these terms may lead to a temporary or
permanent ban.

### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including
sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public
communication with the community for a specified period of time. No public or
private interaction with the people involved, including unsolicited interaction
with those enforcing the Code of Conduct, is allowed during this period.
Violating these terms may lead to a permanent ban.

### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community
standards, including sustained inappropriate behavior,  harassment of an
individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction within
the community.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage],
version 2.0, available at
https://www.contributor-covenant.org/version/2/0/code_of_conduct.html.

Community Impact Guidelines were inspired by [Mozilla's code of conduct
enforcement ladder](https://github.com/mozilla/diversity).

[homepage]: https://www.contributor-covenant.org

For answers to common questions about this code of conduct, see the FAQ at
https://www.contributor-covenant.org/faq. Translations are available at
https://www.contributor-covenant.org/translations.

## Proposal과의 차이점

1. 구현 시 어려움에 따라 desktop application을 두 부분으로 나누었습니다.
    - electron을 통해 GUI 구현
    - 음성인식 및 요약 기능을 node.js를 통해 구현

    ⇒ 두 기능을 엮는 적절한 방법을 찾지 못해 현재 두 개의 프로그램으로 구현하였습니다.

2. 파이썬 + HTML + Javascript의 환경에서 Javascript + HTML의 환경으로 변하였습니다.
3. 자바스크립트를 씀에 따라 사용한 라이브러리가 변화하였습니다. 사용한 라이브러리는 본 문서 상단 [이곳에](https://github.com/OSSP-group-5/hot-lecture-digest#api-reference) 기재하였습니다.
4. 변화한 세부 사용 시나리오에 대해서는 본 문서 상단 [이곳에](https://github.com/OSSP-group-5/hot-lecture-digest#Installation) 기재하였습니다.
5. 강의 영상을 앱에 import하는 방식에서 src폴더에 사용자가 직접 영상을 복사하고, 같은 디렉토리에 full script와 summary 텍스트 파일을 생성한다. 이 생성된 파일을 electron 앱에 강의 정보와 함께 등록함으로써 사용자는 한 주를 효율적으로 관리할 수 있게 됩니다.
