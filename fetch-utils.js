const SUPABASE_URL = 'https://hogsvwpywyaxkjlqavnk.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvZ3N2d3B5d3lheGtqbHFhdm5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQzNDE0MjgsImV4cCI6MTk1OTkxNzQyOH0.WAiLrZ3mwONCOVJiPp_a-AERLY-_YjL2j4b7vkU6QwQ';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// create a single incomplete todo with the correct 'todo' property for this user in supabase
export async function createTodo(todo) {
    const response = await client
    
        .from('todos')
        .insert({
            todo: todo,
            complete: false,
            user_id: client.auth.user().id,
        })
        .single();

    return checkError(response);
}

// delete all todos for this user in supabase
export async function deleteAllTodos() {
    const response = await client
        .from('todos')
        .delete()
        .match({ user_id: client.auth.user().id, });
    return checkError(response);
}

export async function getTodos() {
    const response = await client
        .from('todos')
        .select()
        .order('complete')
        .match({ user_id: client.auth.user().id, });
    return checkError(response);    
}

// find the and update (set complete to true), the todo that matches the correct id
export async function completeTodo(id) {
    const response = await client
        .from('todos')
        .update({ complete: true })
        .match({
            user_id: client.auth.user().id,
            id: id,
        });

    return checkError(response);
}

export async function getUser() {
    return client.auth.session();
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../');
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./todos');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
