export class NameMatcher {
    constructor() {
        this.noisepatterns = [
            /official$/1,
            /real$/1,
            /the$/1,
            /_+/g,
            /\.+/g,
            /\d+/g,
            /^(dr|mr|mrs|ms|prof)_/i,
        ];

        this.titles = ['dr', 'mr', 'mrs', 'ms', 'prof'];

    }


    extractName(username) {
        if (!username) 
            return { name: '', confidence: 0, reasoning: 'username empty'};

        const original = username.toLowerCase();
        let cleaned = original;
        let confidence = 0.5;
        let reasoning = [];

        const dotPattern = /^([a-z]+)\.([a-z]+)$/;
        const underscorePattern = /^([a-z]+)_([a-z]+)$/;

        if (dotPattern.test(cleaned) || underscorePattern.text(cleaned)) {
            confidence= 0.9;
            reasoning.push('Clear firstname.lastname pattern ');
            return {name, confidence, reasoning: reasoning.join(' , ')};
        }

        const hadNumbers = /\d+/.test(cleaned);
        cleaned = cleaned.replace(/\d+/g,'');

        if (hadNumbers) {
            confidence -= 0.1;
            reasoning.push('Contaons Numbers');
        }

        let parts = cleaned.split(/[._\-]/);

        parts = parts.filter(part => {
            const isNoise = ['official', 'real', 'the', 'original', 'verified'].includes(part);

            if (isNoise) {
                confidence -= 0.05;
                reasoning.push('Removed Noise: ${part');
            }

            return !isNoise && part.length > 0
        });

        // check for titles

        let title = '';
        if (this.titles.includes(parts[0])) {
            title = this.capitalize(parts[0]) + ' . ';
            parts.shift();
            confidence += 0.05;
            reasoning.push("Has professional title");           
            }

        // filter out outstandingly short parts whic are likely not names

        parts = parts.filter(sort => parts.length>= 2);

        if (parts.length === 0) {
            return {
                name: this.capitaiize(original),
                confidence : 0.2,
                reasoning: 'Could not parse username'
            }
        }

        // calculate confidnce based on patterns

        if (parts.length === 2) {
            confidence += 0.2;
            reasoning.push('Two part name structure');
        }

        else if (parts.length === 1) {
            confidence -= 0.1;
            reasoning.push('Single part name structure makes it less certain');
        }
        else if (parts.length>=2) {
            confidence -= 0.05,
            reasoning.push('Multiple name parts')
        }


        const allalpha = parts.every(part => /^[a-z]+$/.test(part));
        if (allalpha) {
            confidence += 0.1;
            reasoning.push('All alphanumeric characters');
        }

        else {
            confidence -= 0.15;
            reasoning.push("Non alphanumeric characterrs present");
        }

        // Construct final name

        const name = title + parts.map(this.capitaiize).join(' ');

        confidence = Math.max(0, Math.min(1,confidence));
        
        return {
            name,
            confidence,
            reasoning: reasoning.join(', ') || 'Standard parsing'
        };
    }

    // Capitalize first letter of a string

    capitalize(str) {
        if (!str) 
            return '';

        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }

    // Get a confidence score label

    getConfidenceLabel(confidence) {
        if (confidence >= 0.8) return 'High';
        if (confidence >= 0.5) return 'Medium';
        return 'Low';
    }

    // Set confidence color 

    getConfidenceColor(confidence) {
        if (confidence >= 0.8) return '22c55e';
        if (confidence >= 0.5) return 'f59e0b';
        return 'ef4444';    
    }

}