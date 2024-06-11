//const core = require('@actions/core');
//const github = require('@actions/github');
//const { Octokit } = require('@octokit/core');
import core from '@actions/core';
import { Octokit } from '@octokit/core';



mainFunction();



async function mainFunction(){

    try {
        const GITHUB_TOKEN = core.getInput('github_token');
        const FULL_REPO_NAME = core.getInput('repository');
        const BRANCH_NAME = core.getInput('branch_name');

        const splitRepoName = FULL_REPO_NAME.split('/');
        const owner = splitRepoName[0];
        const repo = splitRepoName[1];

        console.log(GITHUB_TOKEN);
        const pull_request_list = await getPRList(GITHUB_TOKEN, owner, repo);
        await getPRNumber(pull_request_list, BRANCH_NAME);
        core.setOutput('pr_number', '007');
        core.setOutput('pr_exists', false);
      
      
      
      
      } catch (error) {
        // Handle errors and indicate failure
        core.setFailed(error.message);
      }
}


async function getPRList (GITHUB_TOKEN, owner, repo){
    const octokit = new Octokit ({
        auth: GITHUB_TOKEN
    })

    return await octokit.request(`GET /repos/${owner}/${repo}/pulls`, {
        owner: owner,
        repo: repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })   
}

async function getPRNumber(pull_request_list, branch_name) {
    const prData = pull_request_list.data;
    prData.forEach(pr => {
        console.log(pr.head.ref);
    })
}