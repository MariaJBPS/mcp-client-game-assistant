<script lang="ts">
  import { Author, type Message } from '../models';

  let messages: Message[] = [];
  let input = '';

  const getAuthor = (authorType: Author): string => {
    switch (authorType) {
      case Author.Model:
        return 'Bot';
      case Author.User:
        return 'You';
    }
  };

  const send = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      authorType: Author.User,
      author: getAuthor(Author.User),
    };

    messages = [...messages, userMessage];
    input = '';

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    // error handekr
    const data = (await res.json()).obj as Message;

    const chatbotMessage: Message = {
      author: getAuthor(Author.Model),
      authorType: Author.Model,
      text: data.text,
      tokenUsage: data.tokenUsage,
      modelId: data.modelId,
      timestamp: data.timestamp,
    };
    messages = [...messages, chatbotMessage];
  };
</script>

<h2>MCP Chat</h2>

<div class="chat">
  {#each messages as msg}
    <div>
      <p>{msg.author}: {msg.text}</p>
      {#if msg.authorType === Author.Model}
        <p>Token usage: {msg.tokenUsage} tokens.</p>
        <p>Model: {msg.modelId}</p>
        <p>Timestamp: {msg.timestamp}</p>
      {/if}
    </div>
  {/each}
</div>

<input bind:value={input} on:keydown={(e) => e.key === 'Enter' && send()} />
<button on:click={send}>Send</button>
