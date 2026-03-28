<script lang="ts">
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

    const data = await res.json();
    messages = [...messages, `Bot: ${data.reply}`];
  };
</script>

<h1>MCP Chat</h1>

<div class="chat">
  {#each messages as msg}
    <div>{msg}</div>
  {/each}
</div>

<input bind:value={input} on:keydown={(e) => e.key === 'Enter' && send()} />
<button on:click={send}>Send</button>

<style>
  .chat {
    height: 400px;
    overflow-y: auto;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
  }
</style>
