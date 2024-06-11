//const core = require('@actions/core');
//const github = require('@actions/github');
//const { Octokit } = require('@octokit/core');
import core from '@actions/core';
import github from '@actions/github';
import { Octokit } from '@octokit/core';



mainFunction();



const mainFunction = async() => {

    try {
        const GITHUB_TOKEN = core.getInput('github_token');
        const FULL_REPO_NAME = core.getInput('repository');
        const BRANCH_NAME = core.getInput('branch_name');
        const pull_request_list = await getPRList(GITHUB_TOKEN, FULL_REPO_NAME);
        
        
        console.log(FULL_REPO_NAME);
        console.log(BRANCH_NAME);
        console.log(pull_request_list);
        core.setOutput('pr_number', '007');
        core.setOutput('pr_exists', false);
      
      
      
      
      } catch (error) {
        // Handle errors and indicate failure
        core.setFailed(error.message);
      }
}


const getPRList = async (GITHUB_TOKEN, FULL_REPO_NAME) => {
    const octokit = new Octokit ({
        auth: GITHUB_TOKEN
    })

    const splitRepoName = FULL_REPO_NAME.split('/');
    const owner = splitRepoName[0];
    const repo = splitRepoName[1];
    console.log(owner);
    console.log(repo);
    return await octokit.request(`GET /repos/${owner}/${repo}/pulls`, {
        owner: owner,
        repo: repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
   
}