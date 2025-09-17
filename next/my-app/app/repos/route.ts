import {
    NextResponse,
} from 'next/server'

export async function GET() {
    try {
        const response = await fetch('https://api.github.com/users/Dream-yao520/repos');
        const repos = await response.json();
        return NextResponse.json(repos);
    } catch (err) {
        return NextResponse.json({
            error: 'Failed to Fetch repos'
        }, {
            status: 500
        })
    }
}
