# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Add naming of branch
- Add cliff implementation

### Changed

- Merge pull request #53 from datariomj/chore/optimize-install
- Optimize npm install
- Merge pull request #52 from datariomj/chore/ng-update-18
- Merge pull request #49 from datariomj/chore/ng-update-18

### Fixed

- Persist credential on publish
- Trim git-cliff version

## [1.0.0] - 2024-12-31

### Added

- Add npmrc file
- Add nvmrc file
- Add condition instead of if else in scripts
- Add display name for deployment
- Add staging stage
- Add debug for ls
- Add missing depends on
- Add azure pipelines yaml file
- Add cta to home page
- Add initial version
- Add debugger
- Add script true
- Add staging env
- Add readme in home
- Add additional tests
- Add chrome and slack notification
- Add travis
- Add initial cypress test and code coverage, remove protractor
- Add cloudfront invalidation script
- Add deploy command
- Add initial cv
- Add ngxs and implement sidenav expand
- Add custom material theme

### Changed

- Update ngxs to 18
- Update angular material to 18
- Update angular cli and core to 18
- Merge pull request #43 from datariomj/release
- Merge pull request #42 from datariomj/feature/robots-script
- Create step for updating robots.txt
- Merge pull request #41 from datariomj/fix/dynamic-env
- Dynamically set variables on script
- Dynamic robots.txt file
- Reenable tests
- Merge pull request #34 from datariomj/chore/build-artifacts
- Introduce artifacts
- Merge pull request #33 from datariomj/chore/cleanup-dependecies
- Cleanup dependencies
- Update azure pipeline url
- Disable install aws cli
- Install aws cli on microsoft hosted pipelines only
- Call aws directly from local bin for now
- Integrate uptime robot
- Integrate uptime robot
- Merge pull request #32 from datariomj/ci/depends-on
- Merge pull request #31 from datariomj/chore/remove-codecov
- Upload correct folder path
- Point build status to azure
- Merge pull request #30 from datariomj/ci/remove-duplicate-pipeline
- Setup temp azure pipeline
- Merge pull request #29 from datariomj/ci/initial-implementation
- Initial implementation of azure pipelines
- Merge pull request #28 from datariomj/ci/initial-implementation
- Initial implementation of azure pipelines
- Merge pull request #27 from datariomj/ng17
- Update lints and test
- Update to angular 17
- Update to angular 16
- Update to angular 16
- Update angular material to 15
- Update angular to 15
- Create dummy azure pipeline stages
- Use default pool an reapply jobs
- Update greetings
- Update readme message
- Reenable codecov
- Update angular to version 14
- Disable blog and stack tests
- Disable stack and blog routes
- Update marked version to 4.x.x
- Update angular to v13
- Merge pull request #10 from datariomj/snyk-upgrade-cd0252e36f6edafc97b98ae68bccca0d
- Merge pull request #8 from datariomj/snyk-upgrade-d1830f9b13882d88bf144caa98071f57
- Merge pull request #9 from datariomj/snyk-upgrade-9d8bdc97b77a49b19f5171e894b69bb0
- Merge pull request #7 from datariomj/upd-12
- Update angular to v12
- Implement cv page and navigation
- Update messenger
- Merge pull request #5 from datariomj/staging
- Skip cleanup
- Skip debug
- Allow staging branch and add analytics and fb messenger
- Run test on main branch only and update python
- Update soundcloud url
- Update readme
- Include global styles
- Use codacy stylelint recommended config
- Update npm packages
- Update angular budgets and initial readme
- Use node packages
- Change travis distro
- Update package-lock
- Update package-lock
- Implement cv cms and on push change detection
- Implement initial contentful
- Implement static constants for email
- Implement seo service
- Implement ngxs caching for requests
- Install dev dependencies also
- Use node 12
- Setup favicons and jenkins
- Update angular
- Implement initial stack page
- Initial home responsive
- Implement initial responsive layout for sidenav and footer
- Implement initial navbar, footer and home page
- Migrate to eslint and fix generated routing
- Use typescript for cypress
- First commit

### Fixed

- Specify exact version of compodoc to resolve dependency issues
- Use condition for robots.txt
- Move dynamic vars to deployment job
- Use different name for env var
- Introduce if else on environment
- Svg icons on readme
- Disable tests for now
- Revert dist path
- Use pipeline workspace
- Disable checkout on deployment
- Use agent instaed of vsts as home
- Update npm cache path
- Azure pipelines badge
- Export aws to path
- Use agent tools directory for installing aws cli
- Install aws cli as non root
- Install aws cli
- Use bash instead of script
- Use nvm instead of container jobs
- Introduce containers on azure pipelines
- Initial implementation of azure pipeline
- Use steps instead of jobs for azure pipelines
- Change snyk badge url
- Resolve google analytics
- Fix vulnerabilities
- Upgrade tslib from 2.1.0 to 2.3.1
- Upgrade marked from 2.0.1 to 2.1.3
- Upgrade @ngxs/store from 3.7.1 to 3.7.2
- Fix lint error
- Fix terms
- Fix ports
- Fix lint
- Fix allowed branches
- Fix port
- Fix stage names
- Fix stages
- Fix cypress and slack integration
- Fix travis notification and stylelint
- Fix lint errors
- Fix aws script
- Fix sameUrlNavigation not scrolling to top

### Removed

- Remove npmrc file
- Remove excess stage prop
- Remove snyk for now
- Remove jobs and use steps
- Remove codecov and use jobs
- Remove duplicate pipeline and fix e2e
- Remove istanbul dependency
- Remove codecov temporarily
- Remove emoji
- Remove python
- Remove stages and jobs to save resources
- Remove stages
- Remove redundant npm install

[unreleased]: https://github.com/datariomj/datariomj/compare/v1.0.0..HEAD

<!-- generated by git-cliff -->
