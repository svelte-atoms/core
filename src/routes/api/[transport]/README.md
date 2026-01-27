# MCP Server for @svelte-atoms/core

A minimal Model Context Protocol (MCP) server implementation using the official `@modelcontextprotocol/sdk` package. This server provides AI assistants with access to the @svelte-atoms/core library documentation, components, and code generation patterns.

## Installation

```bash
npm install @modelcontextprotocol/sdk
```

## Features

### 📚 Resources (Documentation Access)

- **Essential Documentation**: Overview, Agent Guidelines, Philosophy, Quick Reference
- **Component Documentation**: All 40+ component docs available
- **Patterns & Conventions**: Common patterns, naming conventions

### 🛠️ Tools (Interactive Queries)

- `get_component_info` - Get detailed info about any component
- `list_components` - List all available components
- `get_quick_start` - Get the quick start guide
- `search_patterns` - Search for implementation patterns

### 💡 Prompts (Code Generation)

- `create_component` - Generate new components
- `fix_component` - Fix component issues
- `improve_component` - Get improvement suggestions

## Endpoints

### POST /mcp

Main MCP protocol endpoint. Accepts JSON-RPC 2.0 requests.

### GET /mcp

Returns server information and capabilities.

## Usage Examples

### Initialize Connection

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "initialize"
}
```

### List Available Resources

```json
{
	"jsonrpc": "2.0",
	"id": 2,
	"method": "resources/list"
}
```

### Read Documentation

```json
{
	"jsonrpc": "2.0",
	"id": 3,
	"method": "resources/read",
	"params": {
		"uri": "docs://agent"
	}
}
```

### Get Component Info

```json
{
	"jsonrpc": "2.0",
	"id": 4,
	"method": "tools/call",
	"params": {
		"name": "get_component_info",
		"arguments": {
			"componentName": "button"
		}
	}
}
```

### List All Components

```json
{
	"jsonrpc": "2.0",
	"id": 5,
	"method": "tools/call",
	"params": {
		"name": "list_components",
		"arguments": {}
	}
}
```

### Use Code Generation Prompt

```json
{
	"jsonrpc": "2.0",
	"id": 6,
	"method": "prompts/get",
	"params": {
		"name": "create_component",
		"arguments": {
			"componentType": "form",
			"features": "validation and error handling"
		}
	}
}
```

## Testing

### Test with curl

```bash
# Get server info
curl http://localhost:5173/mcp

# Initialize MCP connection
curl -X POST http://localhost:5173/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize"}'

# List components
curl -X POST http://localhost:5173/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"list_components","arguments":{}}}'

# Get button component info
curl -X POST http://localhost:5173/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"get_component_info","arguments":{"componentName":"button"}}}'
```

## Architecture

The MCP server is implemented as a SvelteKit API route (`+server.ts`) with:

- **Official SDK Types**: Uses `@modelcontextprotocol/sdk` for proper TypeScript types
- **HTTP Transport**: JSON-RPC 2.0 over HTTP POST
- **llms.txt Integration**: Fetches component documentation from `/docs/components/{component}/llms.txt` endpoints
- **Hybrid Documentation**: Uses llms.txt for components (optimized for LLMs) and markdown files for general docs
- **Type Safety**: Full TypeScript support with MCP SDK types
- **Error Handling**: Proper JSON-RPC error codes and messages

## Development

The server runs alongside your SvelteKit dev server:

```bash
npm run dev
```

Access at: `http://localhost:5173/mcp`

## Protocol Version

Implements Model Context Protocol v1.0

## Capabilities

- ✅ Resources with list and read
- ✅ Tools with multiple utilities
- ✅ Prompts for code generation
- ❌ Resource subscriptions (not needed for static docs)
- ❌ Sampling (not applicable)
