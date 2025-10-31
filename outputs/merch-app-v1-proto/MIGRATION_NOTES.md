# **Migration Notes**

[Status](#status)

[Workflow Summary (see detailed steps here)](#workflow-summary-\(see-detailed-steps-here\))

[Engineering Recommendations AI Design Workflow](#engineering-recommendations-ai-design-workflow)

Merchant App V1 prototype, designed and developed by AI and Product Managers, has been integrated to the Merchant App v0 code base and is ready for engineering initial review.

### **Status** {#status}

✅ Complete V1 prototype screens (Area Reach, Neighborhood, Billing, Incentives)  
✅ Hamburger menu with Campaign Center, Demo (What's Plink), FAQ integrations  
✅ Mobile-responsive design with ResponsiveContainer system  
✅ Modern build system (Vite \+ Tailwind \+ shadcn/ui)  
✅ Navigation system with proper routing  
✅ All V0 content successfully migrated

What is not done:

* Data integration  
* Incorporating feedback provided Natasha and Ben  
* Work on login screens, error states, and other supporting screens

AI Drafted Supporting documentation:

* [Readme](?tab=t.3yq4orc8d9g2)  
* [Product\_Stories](?tab=t.y4s1gbizy5lr)  
* [QA\_Testing Guide](?tab=t.bsvl3ngfb9li)

### **Workflow Summary ([see detailed steps here](?tab=t.92iaxedbd7no#heading=h.dhgie1wv40m8))** {#workflow-summary-(see-detailed-steps-here)}

1. Product drafted [Established SMB Narrative](https://docs.google.com/document/u/0/d/1BFWqyTXdBlb9GRu2uP4H2H4mbe5o5SrSLcLJBMcbNB8/edit)  
2. Product & AI drafted [offer narrative](https://docs.google.com/document/u/0/d/1PnmLK2UOCjAA_DXNQT1QxNc04qxkjd0AGCT5l6xmtiY/edit) \- (iterative, not a few shot prompt)  
   * this was developed after we presented AI with our set of value propositions and benefits.   
   * We then iterated to an offer that focused on the merchants needs (not our tech) and simple language the merchant could understand.   
3. Product & AI iteratively created a rough outline of app features to support the offer (this was an iterative process, not a few shot) arriving at an outline of the main UI  
4. Product prompted AI to generate [Screen Briefs](?tab=t.qi9xo58ue1gf#heading=h.xhxwi6gu96ou)  
5. Product created [screens and prompts](?tab=t.wf2iqobr8xil#heading=h.e9j4j2e1l7hf) to support [promises](?tab=t.yta3g1z8uals) of the offer  
6. Engineering provided a [technical prompt](?tab=t.1fl0a432915y)  
7. Product [prompted AI to review](?tab=t.mahqfzjy0p4w) each [screen](?tab=t.wf2iqobr8xil) and produce a [prompt](?tab=t.wf2iqobr8xil) for the AI Designer (eg. Figma)  
8. Figma AI created [prototype screens and code](https://cupid-gush-05876580.figma.site)  
9. Product downloaded files form the Deisgn AI (Figma Make)  
10. Using Claude code, Product got the Design AI files running on a local host (not integrated with prior verison of App \- eg. Merchant App v0)  
    * This step should be engineering in the future  
11. Engineering performed a preliminary review \- gave thumbs up  
12. Using Claude Code, Product:  
    * Got files working on Local Host   
      * This took a lot of iterative work and should be done by engineers in the future  
    * Made additional changes once on Local Host  
      * The product could create a clone and work on the app and then push to a branch for review.  
    * Committed and pushed files to github  
    * AI drafted [Develop Documentation]()

### **Engineering Recommendations AI Design Workflow** {#engineering-recommendations-ai-design-workflow}

The AI determined:

* Commit choices:  
* Documentation  
  *   
* Pedro and Thaigo should advise on the best strategy for harnessing the velocity potential of AI  
  * Should we be making very small changes, focusing prototype efforts on very small changes so we can follow the already established story \-\> engineer \-\> QA  
  * Should we do what we did with Merchant App V1 Prototype by creataing an entirely new application without the story-engineer-QA process?   
* Pedro and Thaigo should review documentation and determine how to prompt AI for improvements to documentation where necessary. We should create instructions for a primary or subagent to create documentation.

