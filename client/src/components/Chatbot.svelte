<script lang="ts">
  import type { ChatbotReply } from '../models';

  let messages: string[] = [];
  let input = '';

  const send = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    messages = [...messages, `You: ${userMessage}`];
    input = '';

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    // error handekr
    const data = (await res.json()).obj as ChatbotReply;
    messages = [
      ...messages,
      `Bot: ${data.text} Token usage: ${data.usage} tokens. Model: ${data.modelId} `,
    ];
  };
</script>

<h2>MCP Chat</h2>

<div class="chat">
  {#each messages as msg}
    <div>{msg}</div>
  {/each}
</div>

<input bind:value={input} on:keydown={(e) => e.key === 'Enter' && send()} />
<button on:click={send}>Send</button>
