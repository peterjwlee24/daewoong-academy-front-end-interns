'use client'
import React from 'react'
import { CSSEdit } from '@/components/TextEdit/CSSEdit'

export default function Concepttest() {
  ;

    const concept = {
        name: "Transitions",
        description: "<bigboldtext>Understanding Transitions on the Digital SAT</bigboldtext><new>\
        <bigboldtext>Overview:</bigboldtext><new>\
        Transitions connect ideas, ensuring flow and coherence in a passage. They help readers understand relationships between sentences and paragraphs: additive, contrastive, causal, or sequential.<new>\
        <bigboldtext>Objectives:</bigboldtext><bulletSection><bullet>\
        Identify types of transition words and phrases.</bullet><bullet>\
        Understand their specific functions in a text.</bullet><bullet>\
        Select the most logical transition for sentences and passages.</bullet><bullet>\
        Improve writing coherence and flow using transitions.</bullet></bulletSection><new>\
        <bigboldtext>Detailed Explanations:</bigboldtext><new>\
        <bold>Definitions:</bold><bulletSection><bullet>\
        <bold>Transition Words/Phrases:</bold> Words or phrases that connect ideas, sentences, and paragraphs.</bullet><bullet>\
        <bold>Additive Transitions:</bold> Add information or show similarity (e.g., additionally, moreover).</bullet><bullet>\
        <bold>Contrastive Transitions:</bold> Show contrast or difference (e.g., however, on the other hand).</bullet><bullet>\
        <bold>Causal Transitions:</bold> Show cause and effect (e.g., therefore, consequently).</bullet><bullet>\
        <bold>Sequential Transitions:</bold> Indicate order or sequence (e.g., first, next, finally).</bullet></bulletSection><new>\
        <bigboldtext>Concept Breakdown:</bigboldtext><new>\
        <bold>Additive Transitions:</bold><new>\
        <bold>Purpose:</bold> Introduce additional information or reinforce previous statements.<new>\
        <bold>Additionally:</bold> Adds further information.<new>\
        <italics>Example:</italics> \"The park has a playground. Additionally, it has picnic areas.\"\
        <bold>Furthermore:</bold> Emphasizes significant added information.<new>\
        <italics>Example:</italics> \"The research was groundbreaking. Furthermore, it paved the way for future discoveries.\"<new>\
        <bold>Contrastive Transitions:</bold><new>\
        <bold>Purpose:</bold> Highlight differences or present opposing viewpoints.<new>\
        <bold>However:</bold> Introduces a contrasting statement.<new>\
        <italics>Example:</italics> \"The weather was forecast to be sunny. However, it rained all day.\"\
        <bold>On the other hand:</bold> Presents an alternative perspective.<new>\
        <italics>Example:</italics> \"The policy has many supporters. On the other hand, some believe it could have negative effects.\"<new>\
        <bold>Causal Transitions:</bold><new>\
        <bold>Purpose:</bold> Indicate cause-and-effect relationships.<new><bulletSection><bullet>\
        <bold>Therefore:</bold> Shows a logical result.<new>\
        <italics>Example:</italics> \"The company increased its marketing efforts. Therefore, sales improved significantly.\"\
        <bold>Consequently:</bold> Emphasizes the result of an action.<new>\
        <italics>Example:</italics> \"The city invested in public transportation. Consequently, traffic decreased.\"<new>\
        <bold>Sequential Transitions:</bold><new>\
        <bold>Purpose:</bold> Organize ideas by time or order.<new>\
        <bold>First:</bold> Introduces the initial point.<new>\
        <italics>Example:</italics> \"First, preheat the oven.\"\
        <bold>Finally:</bold> Marks the last step.<new>\
        <italics>Example:</italics> \"Finally, bake for 30 minutes.\"<new>\
        <bigboldtext>Examples and Steps:</bigboldtext><new>\
        <bold>Passage Question:</bold><new>\
        Original Passage: \"Many believe exercise is essential for good health. Physical activity reduces the risk of chronic diseases. It can improve mental health. Some struggle to find time for exercise. The benefits are well-documented. Experts recommend incorporating small, manageable physical activities into daily routines.\"<new>\
        <bold>Question:</bold> Choose the best transition to start the fifth sentence.<new>\
        A) Additionally,<new>B) Nevertheless,<new>C) For instance,<new>D) As a result,<new>\
        <bold>Steps to Solve:</bold><bulletSection><bullet>\
        <bold>Read the Entire Passage:</bold> Understand the main ideas and structure.</bullet><bullet>\
        <bold>Identify the Key Points:</bold> Note the main points in each sentence.</bullet><bullet>\
        <bold>Determine the Relationship:</bold> Understand how the fifth sentence connects to the preceding information.</bullet><bullet>\
        <bold>Select the Appropriate Transition:</bold> Choose a transition that fits and maintains coherence.</bullet></bulletSection><new>\
        <bold>Solution:</bold> A) Additionally<new>\
        <bold>Explanation:</bold> \"Additionally\" adds information about the benefits of exercise.<new>\
        <bold>Problem Variations:</bold><bulletSection><bullet>\
        Passage Questions: Ensuring transitions contribute to overall passage flow.</bullet></bulletSection><new>\
        <bigboldtext>Recap and Key Points:</bigboldtext><new>\
        <bold>Summary:</bold><bulletSection><bullet>\
        <bold>Types of Transitions:</bold> Additive, contrastive, causal, sequential.</bullet></bulletSection><new>\
        <bold>Steps to Solve Transition Questions:</bold><bulletSection><bullet>\
        Read carefully to understand meaning and relationships.</bullet><bullet>\
        Identify if the relationship adds information, contrasts, shows cause and effect, or follows a sequence.</bullet><bullet>\
        Select the most logical transition to connect ideas.</bullet></bulletSection><new>\
        <bigboldtext>Tips:</bigboldtext><bulletSection><bullet>\
        <bold>Understand Types of Transitions:</bold> Additive (e.g., additionally, moreover), contrastive (e.g., however, on the other hand), causal (e.g., therefore, consequently), sequential (e.g., first, next).</bullet><bullet>\
        <bold>Read Carefully and Identify Relationships:</bold> Understand the relationship between ideas.</bullet><bullet>\
        <bold>Use Context Clues:</bold> Look for clues that signal the type of transition needed.</bullet><bullet>\
        <bold>Select the Most Logical Transition:</bold> Choose the transition that logically connects the ideas and maintains the text's flow.</bullet><bullet>\
        <bold>Practice in Different Contexts:</bold> Practice using transition words and phrases to understand their nuances.</bullet><bullet>\
        <bold>Revise for Coherence:</bold> Ensure the selected transition clarifies connections and maintains coherence.</bullet></bulletSection>".trim()
      };
      
  return (
    <div className="flex flex-col pt-4 w-3/4 lg:w-1/2 mx-auto">
        <h1 className="text-4xl font-bold my-6">{concept.name}</h1>
        {concept.description && <CSSEdit textString={concept.description} />}
    </div>
  )
}